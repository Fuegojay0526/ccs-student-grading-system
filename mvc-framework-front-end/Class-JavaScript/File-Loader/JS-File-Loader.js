
class JS_File{
	 
  
  // Load JavaScript File and Execute Function
  
  static Load(Js_File){
     return new Promise(( resolve, reject ) => {
      if (document.querySelector("head > script[ src = '${Js_File}' ]") !== null ){
          console.warn("script already loaded: ${Js_File}");
           resolve();
         }
        const script = document.createElement( "script" );
          script.src = Js_File;
          script.onload = resolve;
          script.onerror = function( reason ){
                               reason.message = "error trying to load script ${Js_File}";
                            reject( reason );
                           };
    document.head.appendChild( script );
	
  });
 };
  
}
 