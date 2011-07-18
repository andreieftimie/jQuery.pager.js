/*
 * jQuery Pager
 * Copyright 2011 Andrei Eftimie < andrei@eftimie.com >
 * 
 * Is a simple (and effective) pager.
 * I needed a good pager, but all the ones out there are doing weird things which I don't need,
 * Or have a weird way of setting up. 
 *
 */
(function ($){

  $.fn.pager = function (options) {  

    var settings = {
      items_per_page: 1,
      items: '>*'
    };
    
    var method;
    
    if (arguments.length >= 2) {
       method = arguments[0];
       options = arguments[1]; 
    } else {
      options = arguments[0];
    }    
    
    if (options) { 
      $.extend(settings, options);
    }    

    return this.each(function() {        
      
      var
        context = this, //the wrapper element
        items = $(options.items, this), //all items
        slices, //each slice
        pager; //actual pager containing links to each slice
      
      //Initialise the plugin
      init();
      
      
      /*
       * Init
       */
      function init() {
      
        if (method) {} //Apply the method. Not used in v0.1 - probably with a switch statement
        else { //We assume instantiation
        
          if ((options.items_per_page > 1) && (options.items_per_page <= items.length)) {
            
            //We slice all items into chunks based on how many items per page we want to show
            createSlices();                                 
            
          }
          
        }
        
        //Creating the pager links
        pager = $(createPager()).appendTo(context);
        
        //Attaching click events
        attachEventsToPager(pager);
        
      }
      
      
      /*
       * Creating Slices
       */ 
      function createSlices() {
        //Create slices          
        var start = 0, end = 0;
        do {
          start = end;
          end = end + options.items_per_page;
          items.slice(start, end).wrapAll('<div class="slice" />');            
        } while (end <= items.length);
        
        slices = $('.slice', context).hide();
        //SHow the first one (if cookie the last one selected)
        slices.eq(0).show();
      }
      
      /*
       * Creating the Pager
       */
      function createPager() {
        var pager;
        for (var i = 0; i<slices.length; i++) {
          var j = i+1;
          pager += '<a href="#pager-'+j+'">'+j+'</a>';
        }
        return pager;
      }
      
      /*
       * Pager functionality
       */      
      function attachEventsToPager(){
        pager.click(function(e){
          newSlice = parseInt(e.target.href.split('#')[1].split('-')[1]) - 1;
          slices.hide().eq(newSlice).show(); 
          return false;
        });        
      }

    });

  };
  
})(jQuery);