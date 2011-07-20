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
      items: '>*',
      custom_control: false,
      custom_control_label: 'Items per page'
    };
    
    var method;

    if (typeof(arguments[0]) === 'string') {
       method = arguments[0];
      if (typeof(arguments[1]) === 'object') {
        options = arguments[1]; 
      }
    } else {
      options = arguments[0];
    }  
    
    if (options) { 
      $.extend(settings, options);
    }    

    return this.each(function() {        
      
      var
        context = this, //the wrapper element
        items = $(settings.items, context), //all items
        slices, //each slice
        pager, //actual pager containing links to each slice
        customControl; //the custom control element
      
      
      if (method === 'update') {  //Update method      
        //We do a destroy, followed by a new init
        destroy();
        init();
        
      } else if (method === 'destroy') { //Destroy method
        destroy();
      }
      
      else { //We assume instantiation
            
        //Initialise the plugin
        init();
        
      }
      
      /*
       * Init
       */
      function init() {                    
          
          //reassign items
          items = $(settings.items, context);
          
          if ((settings.items_per_page > 1) && (settings.items_per_page <= items.length)) {
            
            //We slice all items into chunks based on how many items per page we want to show
            createSlices();                                 
            
            //Creating the pager links
            pager = $(createPager()).appendTo(context);
            
            //Attaching click events
            attachEventsToPager(pager);
            
            //Createing the custom control
            if ((typeof(settings.custom_control) === 'object') && (settings.custom_control.length))  {
              createCustomControl();
            }
            
          }
          
      }
                        
      
      /*
       * Returns the content to its pristine form
       */
      function destroy(){
        //Unwrap slices
        $(context).find('.slice').find(settings.items).unwrap();
        //Remove pager
        $('.pager', context).remove();
        //Remove Custom Controls
        $('.custom-control', context).remove();
      }
      
      /*
       * Creating Slices
       */ 
      function createSlices() {
        //Create slices          
        var start = 0, end = 0;
        
        do {
          start = end;
          end = end + settings.items_per_page;
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
        var pager = '';
        for (var i = 0; i<slices.length; i++) {
          var j = i+1;
          pager += '<a href="#pager-'+j+'">'+j+'</a>';
        }
        return '<div class="pager">'+pager+'</div>';
      }
      
      /*
       * Pager functionality
       */      
      function attachEventsToPager(){
        pager.click(function(e){
          newSlice = parseInt(e.target.href.split('#')[1].split('-')[1]) - 1;
          slices.hide().eq(newSlice).show();
          $('a', pager).removeClass('active').eq(newSlice).addClass('active');
          return false;
        });        
      }
      
      /*
       * Create the Control for custom number of items per page
       */
      function createCustomControl(){
        var selector = '<div class="custom-control"><label>'+settings.custom_control_label+'</label><select class="custom-control">';
        $.each(settings.custom_control, function(){
          var selected = (settings.items_per_page == this)?' selected ':'';
          selector += '<option '+selected+' value="'+this+'">'+this+'</option>';
        });
        selector += '</select></div>';        
        $(context).append(selector);
        customControl = $('.custom-control', context);
        
        attachControlEvents();
      }
      
      /*
       * Attach Events for the custom control
       */
      function attachControlEvents(){
        var newSettings = settings;        
        customControl.bind('change', function(){
          newSettings.items_per_page = parseInt($('select', customControl).val());
          $(context).pager('update', newSettings);
        });
      }

    });

  };
  
})(jQuery);