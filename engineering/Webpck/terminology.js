/* 
浏览器缓存分为强缓存和协商缓存
强制缓存不会向服务器发送请求，直接从缓存中读取资源，强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control
协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag


hash 模块标识符 标识的是这个打包的过程 同一过程中产出的产物的hash值都是一样的
chunkhash 就是模块的hash 不同chunk下的文件会有不同的hash值
contenthash 根据文件夹内容来定义hash


Asset: 资源是对图像、字体、媒体和任何其他类型文件的统称，通常用于网站和其他应用程序中。
这些文件通常在 output 中最终输出为单独的文件，但也可以通过诸如 style-loader 或 url-loader之类的方法内联。


 bundle 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。

chunk 从入口 entry出发 到它的依赖 以及依赖的依赖一直下去 所打包构成的代码块(模块的集合)叫做一个chunk 也就是说
入口文件和它的依赖的模块构成的一个代码块 被称为一个chunk 一个入口对应一个chunk 多个入口就会对应多个chunk 
动态引入的会单独组合成一个chunk



hmr




webpack 模块
*/