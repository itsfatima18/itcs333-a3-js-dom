// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(function () {
  'use strict';

  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var list = document.getElementById('todo-list');
  var errorMsg = document.getElementById('error-msg');
  var counter = document.getElementById('counter');
  var filterAll = document.getElementById('filter-all');
  var filterActive = document.getElementById('filter-active');
  var filterDone = document.getElementById('filter-done');

  var currentFilter = 'all';

  function applyFilter() {
    for (var i = 0; i < list.children.length; i++) {
      var li = list.children[i];
      var done = li.classList.contains('completed');
      var show =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !done) ||
        (currentFilter === 'done' && done);
      li.style.display = show ? '' : 'none';
    }
  }

  function updateCounter() {
    var left = 0;
    for (var i = 0; i < list.children.length; i++) {
      if (!list.children[i].classList.contains('completed')) left++;
    }
    counter.textContent = left + ' item(s) left';
  }

  function refresh() {
    applyFilter();
    updateCounter();
  }

  function addItem() {
    var text = input.value.trim();
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');

    var li = document.createElement('li');
    var span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'delete-btn';
    btn.textContent = 'Delete';
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);

    input.value = '';
    refresh();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    addItem();
  });

  // Event delegation: one listener on the list
  list.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (!li || !list.contains(li)) return;

    if (e.target.closest('.delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    refresh();
  });

  function setFilter(name) {
    currentFilter = name;
    applyFilter();
  }
  filterAll.addEventListener('click', function () { setFilter('all'); });
  filterActive.addEventListener('click', function () { setFilter('active'); });
  filterDone.addEventListener('click', function () { setFilter('done'); });

  refresh();
})();