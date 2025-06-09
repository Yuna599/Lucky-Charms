// from https://github.com/pmarsceill/just-the-docs/blob/master/assets/js/just-the-docs.js#L47

(function (jtd, undefined) {
  // Event handling
  jtd.addEvent = function (el, type, handler) {
    if (el.attachEvent) {
      el.attachEvent('on' + type, handler);
    } else {
      el.addEventListener(type, handler);
    }
  };

  jtd.removeEvent = function (el, type, handler) {
    if (el.detachEvent) {
      el.detachEvent('on' + type, handler);
    } else {
      el.removeEventListener(type, handler);
    }
  };

  jtd.onReady = function (ready) {
    // In case the document is already rendered
    if (document.readyState != 'loading') {
      ready();
    }
    // Modern browsers
    else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', ready);
    }
    // IE <= 8
    else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') ready();
      });
    }
  };

  // Site search
  function initSearch() {
    var request = new XMLHttpRequest();
    // Replace Liquid syntax with a static or dynamically processed URL
    request.open('GET', '/assets/js/search-data.json', true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);

        // Use a default separator if Liquid processing is not applied
        lunr.tokenizer.separator = /[\s\-/]+/;

        var index = lunr(function () {
          this.ref('id');
          this.field('title', { boost: 200 });
          this.field('content', { boost: 2 });
          this.field('url');
          this.metadataWhitelist = ['position'];

          for (var i in data) {
            this.add({
              id: i,
              title: data[i].title,
              content: data[i].content,
              url: data[i].url,
            });
          }
        });

        searchResults(index, data);
      } else {
        console.log('Error loading ajax request. Request status:' + request.status);
      }
    };

    request.onerror = function () {
      console.log('There was a connection error');
    };

    request.send();

    function searchResults(index, data) {
      var docs = data;
      var searchInput = document.querySelector('.js-search-input');
      var searchResults = document.querySelector('.js-search-results');

      function hideResults() {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
      }

      jtd.addEvent(searchInput, 'keydown', function (e) {
        switch (e.keyCode) {
          case 38: // arrow up
            e.preventDefault();
            var active = document.querySelector('.search-result.active');
            if (active) {
              active.classList.remove('active');
              if (active.parentElement.previousSibling) {
                var previous = active.parentElement.previousSibling.querySelector('.search-result');
                previous.classList.add('active');
              }
            }
            return;
          case 40: // arrow down
            e.preventDefault();
            var active = document.querySelector('.search-result.active');
            if (active) {
              if (active.parentElement.nextSibling) {
                var next = active.parentElement.nextSibling.querySelector('.search-result');
                active.classList.remove('active');
                next.classList.add('active');
              }
            } else {
              var next = document.querySelector('.search-result');
              if (next) {
                next.classList.add('active');
              }
            }
            return;
          case 13: // enter
            e.preventDefault();
            var active = document.querySelector('.search-result.active');
            if (active) {
              active.click();
            } else {
              var first = document.querySelector('.search-result');
              if (first) {
                first.click();
              }
            }
            return;
        }
      });

      jtd.addEvent(searchInput, 'keyup', function (e) {
        switch (e.keyCode) {
          case 27: // When esc key is pressed, hide the results and clear the field
            hideResults();
            searchInput.value = '';
            return;
          case 38: // arrow up
          case 40: // arrow down
          case 13: // enter
            e.preventDefault();
            return;
        }

        hideResults();

        var input = this.value;
        if (input === '') {
          return;
        }

        var results = index.query(function (query) {
          var tokens = lunr.tokenizer(input);
          query.term(tokens, {
            boost: 10,
          });
          query.term(tokens, {
            wildcard: lunr.Query.wildcard.TRAILING,
          });
        });

        if (results.length > 0) {
          searchResults.classList.add('active');
          var resultsList = document.createElement('ul');
          resultsList.classList.add('search-results-list');
          searchResults.appendChild(resultsList);

          for (var i in results) {
            var result = results[i];
            var doc = docs[result.ref];

            var resultsListItem = document.createElement('li');
            resultsListItem.classList.add('search-results-list-item');
            resultsList.appendChild(resultsListItem);

            var resultLink = document.createElement('a');
            resultLink.classList.add('search-result');
            resultLink.setAttribute('href', doc.url);
            resultsListItem.appendChild(resultLink);

            var resultTitle = document.createElement('div');
            resultTitle.classList.add('search-result-title');
            resultTitle.innerText = doc.title;
            resultLink.appendChild(resultTitle);

            var resultRelUrl = document.createElement('span');
            resultRelUrl.classList.add('search-result-rel-date');
            resultRelUrl.innerText = doc.date;
            resultTitle.appendChild(resultRelUrl);

            var metadata = result.matchData.metadata;
            var contentFound = false;
            for (var j in metadata) {
              if (metadata[j].title) {
                var position = metadata[j].title.position[0];
                var start = position[0];
                var end = position[0] + position[1];
                resultTitle.innerHTML =
                  doc.title.substring(0, start) +
                  '<span class="search-result-highlight">' +
                  doc.title.substring(start, end) +
                  '</span>' +
                  doc.title.substring(end, doc.title.length) +
                  '<span class="search-result-rel-date">' +
                  doc.date +
                  '</span>';
              } else if (metadata[j].content && !contentFound) {
                contentFound = true;

                var position = metadata[j].content.position[0];
                var start = position[0];
                var end = position[0] + position[1];
                var previewStart = start;
                var previewEnd = end;
                var ellipsesBefore = true;
                var ellipsesAfter = true;
                for (var k = 0; k < 3; k++) {
                  var nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
                  var nextDot = doc.content.lastIndexOf('.', previewStart - 2);
                  if (nextDot > 0 && nextDot > nextSpace) {
                    previewStart = nextDot + 1;
                    ellipsesBefore = false;
                    break;
                  }
                  if (nextSpace < 0) {
                    previewStart = 0;
                    ellipsesBefore = false;
                    break;
                  }
                  previewStart = nextSpace + 1;
                }
                for (var k = 0; k < 10; k++) {
                  var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
                  var nextDot = doc.content.indexOf('.', previewEnd + 1);
                  if (nextDot > 0 && nextDot < nextSpace) {
                    previewEnd = nextDot;
                    ellipsesAfter = false;
                    break;
                  }
                  if (nextSpace < 0) {
                    previewEnd = doc.content.length;
                    ellipsesAfter = false;
                    break;
                  }
                  previewEnd = nextSpace;
                }
                var preview = doc.content.substring(previewStart, start);
                if (ellipsesBefore) {
                  preview = '... ' + preview;
                }
                preview +=
                  '<span class="search-result-highlight">' +
                  doc.content.substring(start, end) +
                  '</span>';
                preview += doc.content.substring(end, previewEnd);
                if (ellipsesAfter) {
                  preview += ' ...';
                }

                var resultPreview = document.createElement('div');
                resultPreview.classList.add('search-result-preview');
                resultPreview.innerHTML = preview;
                resultLink.appendChild(resultPreview);
              }
            }
          }
        }
      });
    }
  }

  jtd.onReady(function () {
    if (typeof lunr !== 'undefined') {
      initSearch();
    }
  });
})(window.jtd = window.jtd || {});

// Correct usage
let result = 10 % 2; // Valid modulo operation