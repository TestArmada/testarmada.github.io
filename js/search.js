(function () {

  searchResultsArr = [];
  resultsPerPage = 5;

  var searchTerm = getQueryVariable('query');
  var fleet = getQueryVariable('fleet');

  if (searchTerm) {

    // Retain search query and fleet
    document.getElementById('search-box').setAttribute('value', searchTerm);
    document.getElementById('fleet-box').value = fleet;

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', {
        boost: 10
      });
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'content': window.store[key].content
      });
    }

    var results = idx.search(searchTerm); // Get lunr to perform a search
    filterSearchResults(results, window.store, fleet, searchTerm); // We'll write this in the next section

  } else {
    document.getElementById('result-count').innerHTML = 'No search query entered. Please try again.';
  }

})();

function filterSearchResults(results, store, fleet, searchTerm) {

  if (results.length) { // Are there any results?

    for (var i = 0; i < results.length; i++) { // Iterate over the results

      var item = store[results[i].ref];
      // Filter based on fleet
      if (fleet === 'all' || item.url.indexOf(fleet) >= 0) {
        searchResultsArr.push(getResult(item, searchTerm));
      }

    }

  }

  // Display total results remaining after filtering
  document.getElementById('result-count').innerHTML = 'We found ' + searchResultsArr.length + ' documents matching the search term';
  // Show message if no results
  if (searchResultsArr.length === 0) {
    document.getElementById('not-found-message').style.display = 'block';
  }
  // Display 1st page after results are filtered
  generateOutput(1);

}

function generateOutput(page) {

  var searchResults = document.getElementById('search-results');
  var pagination = document.getElementById('pagination');

  // Clear output
  searchResults.innerHTML = '';
  pagination.innerHTML = '';
  var searchOutput = '';
  var paginationOutput = '';

  var startResults = (page - 1) * resultsPerPage;
  var endResults = ((startResults + resultsPerPage) < searchResultsArr.length) ? startResults + resultsPerPage : searchResultsArr.length;
  for (var i = startResults; i < endResults; i++) {
    searchOutput += appendOutput(i);
  }
  searchResults.innerHTML = searchOutput;

  paginationOutput = appendPagination(page);
  pagination.innerHTML = paginationOutput;
  document.getElementById('pagination').style.display = 'block';

}

function appendOutput(index) {
  var data = '';
  data += '<div class="search-result">';
  data += '<a href="' + searchResultsArr[index].url + '" class="result-url">' + searchResultsArr[index].url.replace('/documentation/', '') + '</a>';
  data += '<h3 class="result-title">' + searchResultsArr[index].title + '</h3>';
  data += '<p class="result-excerpt">' + searchResultsArr[index].excerpt + '</p>';
  data += '</div>';
  return data;
}

function appendPagination(currentPage) {
  var totalPages = parseInt((searchResultsArr.length % resultsPerPage === 0) ? searchResultsArr.length / resultsPerPage : searchResultsArr.length / resultsPerPage + 1);
  if (!totalPages) {
    totalPages = 1;
  }
  var data = '';
  // Previous button
  if (currentPage > 1) {
    data += '<span class="pagination__prev" onclick="generateOutput(' + (currentPage - 1) + ');return false;">' + getPrevIcon() + '</span>';
  } else {
    data += '<span class="pagination__prev pagination__disabled">' + getPrevIcon() + '</span>';
  }
  // Pages
  var maxPages = 20; // Max 20 pages fit without overflowing (even on 1024px wide screen)
  var minPages = maxPages - 2; // -2 for ... on both sides
  var pagesToLeft = parseInt(minPages / 2); // Max pages on left of current page
  var pagesToRight = minPages - pagesToLeft - 1; // Max pages on right of current page (-1 to account current page)
  if (totalPages > maxPages) { // Show ...
    if (currentPage <= (maxPages / 2) + 1) { // Show ... only at the end (+1 as there won't be ... at the beginning)
      for (let i = 1; i < maxPages; i++) {
        data += getPageBtn(i, currentPage);
      }
      data += getMorePagesBtn();
    } else { // Show ... at the beginning
      data += getMorePagesBtn();
      if (currentPage + pagesToRight < totalPages - 1) { // Show ... at the end
        for (let i = currentPage - pagesToLeft; i <= currentPage + pagesToRight; i++) {
          data += getPageBtn(i, currentPage);
        }
        data += getMorePagesBtn();
      } else { // ... not needed at the end
        for (let i = totalPages - minPages; i <= totalPages; i++) {
          data += getPageBtn(i, currentPage);
        }
      }
    }
  } else { // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      data += getPageBtn(i, currentPage);
    }
  }
  // Next button
  if (currentPage < totalPages) {
    data += '<span class="pagination__next" onclick="generateOutput(' + (currentPage + 1) + ');return false;">' + getNextIcon() + '</span>';
  } else {
    data += '<span class="pagination__next pagination__disabled">' + getNextIcon() + '</span>';
  }
  return data;
}

function getPrevIcon() {
  return '<img src="/images/search/arrow-left-icon.png" srcset="/images/search/arrow-left-icon%402x.png 2x, /images/search/arrow-left-icon%403x.png 3x" />';
}

function getNextIcon() {
  return '<img src="/images/search/arrow-right-icon.png" srcset="/images/search/arrow-right-icon%402x.png 2x, /images/search/arrow-right-icon%403x.png 3x" />';
}

function getPageBtn(index, currentPage) {
  var content = '';
  if (index === currentPage) {
    content = '<span class="pagination__page pagination__current-page">' + index + '</span>';
  } else {
    content = '<span class="pagination__page" onclick="generateOutput(' + index + ');return false;">' + index + '</span>';
  }
  return content;
}

function getMorePagesBtn() {
  return '<span class="pagination__more pagination__disabled">...</span>';
}

function getResult(item, searchTerm) {
  var result = {};
  result.url = item.url;
  result.title = item.title;
  result.excerpt = getExcerpt(item.content, searchTerm);
  return result;
}

// Create excerpt for all appearances of 'searchTerm'
function getExcerpt(content, searchTerm) {
  var maxExcerpts = 5;
  var indices = getIndicesOf(searchTerm, content);
  var excerpt = generateFormattedExcerpt(content, indices, searchTerm, maxExcerpts);
  // If entire search query string does not generate excerpt, get excerpts for individual words in string
  if (!excerpt.length) {
    var searchTerms = searchTerm.split(' ');
    maxExcerpts = (5 / searchTerms.length); // max no. of excerpts for each searchTerm
    var excerpt = '';
    for (var i = 0; i < searchTerms.length; i++) {
      indices = getIndicesOf(searchTerms[i], content);
      excerpt += generateFormattedExcerpt(content, indices, searchTerms[i], maxExcerpts);
    }
  }
  return excerpt;
}

function generateFormattedExcerpt(content, indices, searchTerm, maxExcerpts) {
  var formattedExcerpt = '';
  var characters = 50; // no. of characters to show on each side
  var j = 0;
  var excerptSentences = 0;
  while (j < indices.length && excerptSentences < maxExcerpts) {
    // Searched word
    var word = content.substring(indices[j], indices[j] + searchTerm.length);
    // Excerpt before the searched word
    var start = (indices[j] >= characters) ? indices[j] - characters : 0;
    var before = content.substring(start, indices[j]);
    // Excerpt after the searched word
    var end = (indices[j] <= content.length - characters) ? indices[j] + characters : content.length;
    var after = content.substring(indices[j] + searchTerm.length, end);
    // Formatted excerpt (excerpt before + highlighted word + excerpt after)
    formattedExcerpt += ((start > 0) ? '..' : '') + before + '<span class="search-term">' + word + '</span>' + after + ((end < content.length) ? '..' : '');
    j++;
    excerptSentences++;
  }
  return formattedExcerpt;
}

// Find all indices of 'searchStr' in 'str'
function getIndicesOf(searchStr, str) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0;
  var index;
  var indices = [];
  str = str.toLowerCase();
  searchStr = searchStr.toLowerCase();
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}
