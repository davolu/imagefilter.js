 
 /****
 
 Libary : imageFilter.js
 
   A simple libary for adding basic effects and convolution kernels  to html images;
   
   Author: Oluyale David
   oluyaled@gmail.com
 
 
 
 *******/
 window.onload =  imageFilter;
 
 
   function imageFilter(id)
{ 
  
	   
	 
		
		if(!supported())
		  {
		     //do nothing if the browser doesnt support the canvas element
		  }
		  else
		  {
		        //process it!!
				 processor(id);
		  }
		  
	             
		 

}
 
 
 
 function processor(id)
		{
		
		    if(! document.getElementsByTagName("IMG"))
			{
			     	var img = document.getElementById(""+id+"");
			}
			else
			{
			var img = document.getElementsByTagName("IMG");
		     } 
			       for(a=0; a<img.length; a++)
								{
								
								    if(img[a].className.match(/img-[a-z\s]*/gi))
								         {
														temp =  img[a].className.replace(/img-/gi,"");
														 
														    if(temp.indexOf("inverted") !=-1)
															      {
																      
																	    invert(img[a]);
																  
																  }
																  
																  else if(temp.indexOf("grayscale") !=-1)
										 
																	{
																	   
																	   grayscale(img[a]);
																	
																	}
																	
																	 else if(temp.match(/brightness\(\d+\)/gi))
										 
																	{
																	  val =  temp.match(/\d+/gi,"");
																	   bright(img[a],val);
																	
																	}
																	
																	 else if(temp.match(/contrast\(\d+\)/gi,""))
										 
																	{
																	  val =  temp.match(/\d+/gi,"");
																	   contrast(img[a],val);
																	
																	}
																	
																	 else if(temp.match(/threshold\(\d+\)/gi,""))
										 
																	{
																	  val =  temp.match(/\d+/gi,"");
																	   threshold(img[a],val);
																	
																	}
																	
																	  
																  else if(temp.indexOf("blur") !=-1)
										 
																	{
																	   
																	   blur(img[a]);
																	
																	}
																	
																	 else if(temp.indexOf("sharpen") !=-1)
										 
																	{
																 
																	   sharpen(img[a]);
																	
																	}
																	
																	  else if(temp.indexOf("edge") !=-1)
										 
																	{
																	   
																	   edge(img[a]);
																	
																	}
																	
																		  else if(temp.indexOf("reflect") !=-1)
										 
																	{
																	   
																	   reflect(img[a]);
																	
																	}
																	
																	  else if(temp.indexOf("sobel") !=-1)
										 
																	{
																	   
																	   sobel(img[a]);
																	
																	}
																	
																 else if(temp.match(/rgb\([\d,\s]+\)/gi,""))
										 
																	{
																	 
																	  val =  temp.match(/[\d,]+/gi,"").toString();
																	  
																	    sp = val.split(",");
																 
																	  rgb(img[a],parseInt(sp[0]),parseInt(sp[1]),parseInt(sp[2]) );
																	
																	}
																	
													 else if(temp.match(/rgba\([\d,\s]+\)/gi,""))
										 
																	{
																	 
																	  val =  temp.match(/[\d]+/gi,"").toString();
																	  
																	    sp = val.split(",");
																 
																	  rgb(img[a],parseInt(sp[0]),parseInt(sp[1]),parseInt(sp[2]) ,parseInt(sp[3]));
																	
																	}
																	
															 else if(temp.match(/conv\([\d,-\d\s]+\)/gi,""))
										 
																	{
																	 
																	 
																	  val =  temp.match(/[\d,-\d]+/gi,"").toString();
																	  
																	    sp = val.split(",");
																 
																	  conv(img[a],parseFloat(sp[0]),parseFloat(sp[1]),parseFloat(sp[2]) ,parseFloat(sp[3])  ,parseFloat(sp[4])  ,parseFloat(sp[5])  ,parseFloat(sp[6])  ,parseFloat(sp[7]) ,parseFloat(sp[8]));
																	
																	}	 
																	
																	else{}
										 
										 }
										 else
										 {}
								
								}
		
		}
		
		
		 
 
 function rgb(imgElem,r,g,b)
 {
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){

									 pixel[n] = pixel[n]+r  || r;
									 pixel[n+1] = pixel[n+1]+g || g;
									 pixel[n+2] = pixel[n+2]+b || b;
									 pixel[n+3]=255;
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 function rgba(imgElem,r,g,b,a)
 {
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){

									 pixel[n] = pixel[n]+r  || r;
									 pixel[n+1] = pixel[n+1]+g || g;
									 pixel[n+2] = pixel[n+2]+b || b;
									 pixel[n+3]=pixel[n+3]+a || a;
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
  function invert(imgElem)
 {
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){

									 pixel[n] = 255 - pixel[n] ;
									 pixel[n+1] = 255 - pixel[n+1] ;
									 pixel[n+2] = 255 - pixel[n+2] ;
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
  function grayscale(imgElem)
 {
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
	 
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){

									grayscale= 255- pixel[n];
									pixel[n]= 0;
									pixel[n+1]=0;
									pixel[n+2]=0;
									pixel[n+3]=grayscale+0.99;
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
 
  function bright(imgElem,val)
 {
 
  var  valx = parseInt(val);
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){

								pixel[n]+= valx *10;
								pixel[n+1]+= valx *10;
								pixel[n+2]+=valx *10;
							 
								
								
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
 function contrast(imgElem,val)
 {
 
  var  valx = parseInt(val);
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){

								pixel[n]-= valx *10;
								pixel[n+1]-= valx *10;
								pixel[n+2]-=valx *10;
							 
								
								
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
 
 
 
 function threshold(imgElem,val)
 {
 
  var  valx = parseInt(val)*10;
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
		ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
		imagedata=ctx.getImageData(0,0, canvas.width, canvas.height);
		pixel=  imagedata.data;
		
								for(n=0; n<pixel.length; n+=4){
									
								     r = pixel[n];
									 g = pixel[n+1];
									 b= pixel[n+2];
									 
									 
									pixel[n] = pixel[n+1] =  pixel[n+2] = ((0.2126*r+0.7152*g+0.0722*b) >= valx) ? 255 : 0;
								 
							             
								
								
								}
 
 ctx.putImageData(imagedata,0,0);
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
  
 function blur(imgElem)
 {
 
  
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
	
         ctx.globalAlpha = 0.3;
		 
		 var offset = 5;
		 
		  for(b=1; b<=8; b++)
		   {
		      	ctx.drawImage(imgElem,offset,0,canvas.width-offset,canvas.height );
				 	ctx.drawImage(imgElem,0,offset,canvas.width,canvas.height-offset );
		    }
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
  function sharpen(imgElem)
 {
 
 
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
	ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
    sharpener(ctx, canvas.width, canvas.height,   0.01*100, [0, -1, 0, 
															-1, 5, -1,
															0, -1, 0]);
		
								 
 
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
   function edge(imgElem)
 {
 
 
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
	ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
    sharpener(ctx, canvas.width, canvas.height,   0.01*100, [-1, -1, -1,  
															 -1, 8, -1, 
															 -1, -1, -1]);
		
								 
 
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
    function sobel(imgElem)
 {
 
 
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
	ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
    sharpener(ctx, canvas.width, canvas.height,   0.01*100, [1, 1, 1,  
															 1, 0.7, -1, 
															 -1, -1, -1]);
		
								 
 
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
 
 
    function conv(imgElem,a,b,c,d,e,f,g,h,i)
 {
 
 
 
      var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height;
	ctx.drawImage(imgElem,0,0,canvas.width,canvas.height);
    sharpener(ctx, canvas.width, canvas.height,   0.01*100, [a, b,c,  
															 d, e, f, 
															 g, h, i]);
		
								 
 
		 
imgElem.src= canvas.toDataURL("image/png");
 
 }
 
   function reflect(imgElem)
 {
        var  canvas  = document.createElement("canvas");
		var ctx= canvas.getContext("2d");
    
	canvas.width = imgElem.width;
	canvas.height  = imgElem.height*2;
	 
  	ctx.drawImage(imgElem,0,0,canvas.width,canvas.height/1.1);
 ctx.scale(1,-1);
 ctx.translate(0,-canvas.height);
  	ctx.drawImage(imgElem,0,0,canvas.width,canvas.height/4.8);
	
	var grad = ctx.createLinearGradient(0,0,0, canvas.height/8);
	grad.addColorStop(0, 'rgba(0,0,0, 1.6)');
	grad.addColorStop(1, 'rgba(0,0,0, 0.5)');
	
	ctx.fillStyle = grad;
	ctx.rect(0,0,canvas.width,canvas.height/4.8);
	ctx.fill();
	
imgElem.src= canvas.toDataURL("image/png");
		 
 }
 
 
 
function sharpener(ctx, w, h, mix,weightsarr) {
    var weights =weightsarr;  
        katet = Math.round(Math.sqrt
(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = ctx.createImageData(w, h),
        dstBuff = dstData.data,
        srcBuff = ctx.getImageData(0, 0, w, h).data,
        y = h;
    while (y--) {
        x = w;
        while (x--) {
            var sy = y,
                sx = x,
                dstOff = (y * w + x) * 4,
                r = 0,
                g = 0,
                b = 0,
                a = 0;
           
		   for (var cy = 0; cy < katet; cy++) {
                
				for (var cx = 0; cx < katet; cx++) {
                    var scy = sy + cy - half;
                    var scx = sx + cx - half;
					
                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        var srcOff = (scy * w + scx) * 4;
                        var wt = weights[cy * katet + cx];
                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }
            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix)
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }
    ctx.putImageData(dstData, 0, 0);
}
 
 
 
 
 
 function  supported()
 {
 
    var elem = document.createElement("canvas");
	   
	   return !! (elem.getContext('2d')  && elem.getContext('2d'));
	   
 
 }