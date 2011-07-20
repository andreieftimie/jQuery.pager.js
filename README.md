# jQuery.pager.js

## Usage:
$('#container').pager();

$('#container').pager({
  items: 'div.item',
  items_per_page: 6,
});

## Settings
settings = {
  items: '> *',
  items_per_page: 1,
  cookie: true
}

## Methods
$('#container').pager('update', {
  items_per_page: 10
});

$('#container').pager('destroy');

## On future versions
$('#container').pager('show_page', 4); //Shows the 4th page
$('#container').pager('show_item', 14); //Shows the page where item 14 lives. Same page if (items_per_page === 1)
$('#container').pager('show_item', '.item5'); //If there are multiple items matching the description, will show the first
$('#container').pager('show_item', $el); //We can also pass in a jQuery collection



