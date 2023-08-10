import{_ as n,p as s,q as a,a1 as t}from"./framework-5866ffd3.js";const p={},o=t(`<h3 id="一、前言-为什么会出现promise" tabindex="-1"><a class="header-anchor" href="#一、前言-为什么会出现promise" aria-hidden="true">#</a> 一、前言：为什么会出现Promise?</h3><p>Promise的重要性我认为没有必要多讲，概括起来说就是五个字：<strong>必！须！得！掌！握！</strong>。</p><p>而且还要掌握透彻，在实际的使用中，有非常多的应用场景我们不能立即知道应该如何继续往下执行。</p><p>最常见的一个场景就是ajax请求，通俗来说，由于网速的不同，可能你得到返回值的时间也是不同的，</p><p>这个时候我们就需要等待，结果出来了之后才知道怎么样继续下去。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;https://v0.yiketianqi.com/api?unescape=1&amp;version=v61&amp;appid=82294778&amp;appsecret=4PKVFula&amp;city=%E5%8C%97%E4%BA%AC&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">&gt;=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在ajax的原生实现中，利用了onreadystatechange事件，当该事件触发并且符合一定条件时，才能拿到想要的数据，之后才能开始处理数据，这样做看上去并没有什么麻烦，但如果这个时候，我们还需要另外一个ajax请求，这个新ajax请求的其中一个参数，得从上一个ajax请求中获取，这个时候我们就不得不等待上一个接口请求完成之后，再请求后一个接口。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;https://v0.yiketianqi.com/api?unescape=1&amp;version=v61&amp;appid=82294778&amp;appsecret=4PKVFula&amp;city=%E5%8C%97%E4%BA%AC&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">&gt;=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span>
            
            <span class="token comment">//伪代码....</span>
            <span class="token keyword">let</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;http://www.xx.com?a&#39;</span><span class="token operator">+</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span><span class="token punctuation">;</span>
            xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status<span class="token operator">&gt;=</span><span class="token number">200</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status<span class="token operator">&lt;</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span>
                        
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当出现第三个ajax(甚至更多)仍然依赖上一个请求时，我们的代码就变成了一场灾难。</p><p>这场灾难，往往也被称为<strong>回调地狱</strong>。</p><p>因此我们需要一个叫做Promise的东西，来解决这个问题，当然，除了回调地狱之外，还有个非常重要的需求就是</p><p><strong>为了代码更加具有可读性和可维护性，我们需要将数据请求与数据处理明确的区分开来</strong>。</p><p>上面的写法，是完全没有区分开，当数据变得复杂时，也许我们自己都无法轻松维护自己的代码了。</p><p>这也是模块化过程中，必须要掌握的一个重要技能，请一定重视。</p><h3 id="二、promise是什么" tabindex="-1"><a class="header-anchor" href="#二、promise是什么" aria-hidden="true">#</a> 二、Promise是什么?</h3><blockquote><p>Promise是异步编程的一种解决方案，比传统的解决方案回调函数更合理、更强大。</p><p>ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。</p><p>指定回调函数的方式也变得更加灵活易懂，也解决了异步<code>回调地狱</code>的问题</p><p>旧方案是单纯使用回调函数，常见的异步操作有：定时器、fs模块、ajax、数据库操作</p><p>从语法上说，Promise是一个构造函数；</p><p>从功能上说，Promise对象用来封装一个异步操作并可以获取其成功/失败的结果值。</p></blockquote><h4 id="_2-1-promise的初体验" tabindex="-1"><a class="header-anchor" href="#_2-1-promise的初体验" aria-hidden="true">#</a> 2.1 Promise的初体验</h4><p>创建promise对象（pending状态）</p><p>const p = new Promise(executor);</p><p>其中：</p><p>executor函数: 执行器 (resolve, reject) =&gt; {}</p><p>resolve函数: 内部定义成功时我们调用的函数 value =&gt; {}</p><p>reject函数: 内部定义失败时我们调用的函数 reason =&gt; {}</p><p>executor会在Promise内部立即同步调用,异步操作在执行器中执行</p><p>实例对象调用Promise原型中的then方法来完成对结果的处理</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//如果咱们公司今年挣钱了，年底就发奖金，否则不发</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;发奖金&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;不发奖金&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h3 id="三、使用promise的好处" tabindex="-1"><a class="header-anchor" href="#三、使用promise的好处" aria-hidden="true">#</a> 三、使用Promise的好处?</h3><h4 id="_3-1-指定回调函数的方式更加灵活" tabindex="-1"><a class="header-anchor" href="#_3-1-指定回调函数的方式更加灵活" aria-hidden="true">#</a> 3.1 指定回调函数的方式更加灵活</h4><ol><li><p>旧的：必须在启动异步任务前指定</p></li><li><p>promise：启动异步任务-&gt;返回promise对象-&gt;给promise对象绑定回调函数</p><p>(甚至可以在异步任务结束后指定/多个)</p></li></ol><h4 id="_3-2-可以解决回调地狱问题-支持链式调用" tabindex="-1"><a class="header-anchor" href="#_3-2-可以解决回调地狱问题-支持链式调用" aria-hidden="true">#</a> 3.2 可以解决回调地狱问题，支持链式调用</h4><ol><li><p>什么是回调地狱？</p><p>回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件</p></li><li><p>回调地狱的缺点?</p><p>不便于阅读</p><p>不便于异常处理</p></li><li><p>解决方案？</p><p>promise链式调用</p></li><li><p>终极解决方案？</p><p>async/await</p></li></ol><h3 id="四、promise实例对象的两个属性" tabindex="-1"><a class="header-anchor" href="#四、promise实例对象的两个属性" aria-hidden="true">#</a> 四、Promise实例对象的两个属性</h3><ul><li><p>PromiseState</p><p>此属性为promise对象的状态属性。</p><ul><li>fulfilled：成功的状态</li><li>rejected：失败的状态</li><li>pending：初始化的状态</li></ul><p>【注】状态只能由pending-&gt;fulfilled 或者是 pending-&gt;rejected</p></li><li><p>PromiseResult</p><p>此属性为promise对象的结果值（resolve以及reject函数的形参值）</p></li></ul><h3 id="五、resolve函数以及reject函数" tabindex="-1"><a class="header-anchor" href="#五、resolve函数以及reject函数" aria-hidden="true">#</a> 五、resolve函数以及reject函数</h3><ul><li>resolve：修改promise对象的状态，由pending修改到fulfilled；将实参设置到这个属性PromiseResult中。</li><li>reject：修改promise对象的状态，由pending修改到rejected；将实参设置到这个属性PromiseResult中。</li></ul><p>案例1：利用promise来进行读取文件操作</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//1.普通文件读取方式</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2.直接利用readfile来进行读取</span>
<span class="token comment">/* fs.readFile(__dirname + &#39;/data.txt&#39;,(err,data)=&gt;{
    if(err) throw err;
    console.log(data.toString());
}) */</span>

<span class="token comment">//3.利用promise来实现文件的读取</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">&#39;/data.txt&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>案例2：利用promise进行ajax请求</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>button<span class="token operator">&gt;</span>发送ajax请求<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
        <span class="token comment">//1.获取DOM元素对象</span>
        <span class="token keyword">let</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2.绑定事件</span>
        btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//3.创建promise实例对象</span>
            <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token comment">//4.创建ajax实例对象</span>
                <span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//5.打开请求</span>
                xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;https://www.yiketianqi.com/free/day?appid=82294778&amp;appsecret=4PKVFula&amp;unescape=1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//6.发送请求</span>
                xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//7.利用onreadystatechange事件</span>
                xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token comment">//8.判断</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token keyword">if</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                            <span class="token function">resolve</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                            <span class="token function">reject</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;获取信息失败&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>
</code></pre></div><p>案例3：利用promise进行数据库操作</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;mongoose&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&#39;mongodb://127.0.0.1/project&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;open&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">//连接成功的情况</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//连接失败的情况</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//创建结构</span>
    <span class="token keyword">const</span> NoteSchema <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">mongoose<span class="token punctuation">.</span>Schema</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
        <span class="token literal-property property">content</span><span class="token operator">:</span> String
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">//创建模型</span>
    <span class="token keyword">const</span> NoteModel <span class="token operator">=</span> mongoose<span class="token punctuation">.</span><span class="token function">model</span><span class="token punctuation">(</span><span class="token string">&#39;notes&#39;</span><span class="token punctuation">,</span> NoteSchema<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//读取操作</span>
    NoteModel<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;连接失败&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>案例4：封装一个函数，作用是读取文件</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">ReadFileFun</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
         fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
              <span class="token comment">//判断</span>
              <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
              <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
         <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">ReadFileFun</span><span class="token punctuation">(</span><span class="token string">&#39;./data.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>node中的promisify</p><ul><li>promisify (只能在 NodeJS 环境中使用)</li><li>promisify 是 util 模块中的一个方法 util 是 nodeJS 的内置模块</li><li>作用: 返回一个新的函数, 函数的是 promise 风格的.</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> util <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;util&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//通过 fs.readFile 创建一个新的函数</span>
<span class="token keyword">const</span> mineReadFile <span class="token operator">=</span> util<span class="token punctuation">.</span><span class="token function">promisify</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span>readFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">mineReadFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/2.html&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="六、promise对象的状态" tabindex="-1"><a class="header-anchor" href="#六、promise对象的状态" aria-hidden="true">#</a> 六、Promise对象的状态</h3><p>Promise对象通过自身的状态来控制异步操作，Promise实例具有三种状态.</p><ul><li>异步操作未完成：pending</li><li>异步操作成功：fulfilled</li><li>异步操作失败：rejected</li></ul><p>这三种的状态的变化途径只有两种</p><ul><li>从pending(未完成)到fulfilled(成功)</li><li>从pending(未成功)到rejected(失败)</li></ul><p>一旦状态发生变化，就凝固了，不会再有新的状态变化，这也是Promise这个名字的由来，它的英语意思&quot;承诺&quot;，</p><p>一旦承诺生效，就不得再改变了，这也意味着Promise实例的状态变化只可能发生一次。</p><p>在Promise对象的构造函数中，将一个函数作为第一个参数。而这个函数，就是用来处理Promise的状态变化。</p><p>上面的resolve和reject都为一个函数，他们的作用分别是将状态修改为resolved和rejected。</p><p>因此，Promise的最终结果只有两种。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">异步操作成功，Promise实例传回一个值</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>，状态变为fulfilled<span class="token punctuation">.</span>
<span class="token function">异步操作失败，Promise实例抛出一个错误</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">,</span>状态变为rejected
</code></pre></div><h3 id="七、promise的then方法" tabindex="-1"><a class="header-anchor" href="#七、promise的then方法" aria-hidden="true">#</a> 七、Promise的then方法</h3><p>then：指定用于得到成功value的成功回调和用于得到失败reason的失败回调，<code>返回一个新的promise对象</code></p><ul><li>成功的状态：执行第一个回调函数</li><li>失败的状态：执行第二个回调函数</li></ul><p>promise.then()返回的新promise的结果状态由什么决定?</p><p>(1) 简单表达: 由then()指定的回调函数执行的结果决定</p><p>(2) 详细表达:</p><p>① 如果抛出异常, 新promise变为rejected, reason为抛出的异常</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token keyword">throw</span> <span class="token string">&#39;错误&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>② 如果返回的是非promise的任意值, 新promise变为fulfilled, PromiseResult为返回的值</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>③ 如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
		<span class="token comment">//resolve(&#39;111&#39;);</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="八、promise的链式调用" tabindex="-1"><a class="header-anchor" href="#八、promise的链式调用" aria-hidden="true">#</a> 八、Promise的链式调用</h3><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token comment">//resolve(&#39;ok&#39;);</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>案例：通过promise的链式调用来读取文件</p><p>回调地狱的方式：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/1.html&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data1</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/1.html&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data2</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    	<span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/1.html&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data3</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    		<span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data1 <span class="token operator">+</span> data2 <span class="token operator">+</span> data3<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Promise的形式：</p><p>需求：读取resource下三个文件内容，并在控制台合并输出</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/1.html&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
		 <span class="token comment">//如果失败 则修改promise对象状态为失败</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//如果成功 则修改promise对象状态为成功</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/2.html&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
             <span class="token comment">//失败</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">[</span>value<span class="token punctuation">,</span>data<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/3.html&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span>data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
             <span class="token comment">//失败</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            value<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//成功</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="九、promise下的几种方法" tabindex="-1"><a class="header-anchor" href="#九、promise下的几种方法" aria-hidden="true">#</a> 九、Promise下的几种方法</h3><h4 id="_9-1-promise-resolve" tabindex="-1"><a class="header-anchor" href="#_9-1-promise-resolve" aria-hidden="true">#</a> 9.1 Promise.resolve()</h4><p>将一个普通值转化为promise类型的数据</p><ul><li>若参数为非promise对象，则返回的结果为成功状态的promise对象</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> p1 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> p2 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>若参数为promise对象，参数的状态决定返回结果的状态</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> p3 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p3<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> p4 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;OK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p4<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_9-2-promise-reject" tabindex="-1"><a class="header-anchor" href="#_9-2-promise-reject" aria-hidden="true">#</a> 9.2 Promise.reject()</h4><p>返回的结果<code>始终为失败的Promise对象</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_9-3-promise-catch" tabindex="-1"><a class="header-anchor" href="#_9-3-promise-catch" aria-hidden="true">#</a> 9.3 Promise.catch()</h4><p>功能是用来指定失败的回调函数</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token comment">//resolve(&#39;success&#39;);</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//then方法中不是必须传入两个参数，可以只传递成功时的回调函数</span>
<span class="token comment">//也可以单独使用catch来指定失败的回调函数</span>

<span class="token comment">//异常（错误）穿透</span>
<span class="token comment">//当如果有多个需要执行的成功时的回调函数，可以不需要每一次都写失败回调，可以统一最后利用catch</span>
<span class="token comment">//当如果promise对象的状态为reject的话，会一直向下穿透直到catch方法</span>
p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_9-4-promise-all" tabindex="-1"><a class="header-anchor" href="#_9-4-promise-all" aria-hidden="true">#</a> 9.4 Promise.all()</h4><p>作用：针对于多个Promise的异步任务进行处理</p><p>接收的参数：promise数组</p><p>返回值：promise对象，状态由<code>promise数组中的对象状态</code>决定</p><ul><li>若每个对象状态<code>都为</code>成功，则返回的promise对象状态为成功，</li></ul><p>​ 成功的结果值为<code>每个promise对象成功结构值组成的数组</code></p><ul><li>若<code>其中一个对象</code>状态为失败，则返回的promise对象状态为失败，</li></ul><p>​ 失败的结果值为<code>失败的promise对象的结果值</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> p2 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> p3 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;oh yeah&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">,</span> p3<span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>当有一个ajax请求，它的参数需要另外2个甚至更多请求都有返回结果之后才能确定，</p><p>那么这个时候，就需要用到Promise.all来帮助我们应对这个场景。</p><p>Promise.all接收一个Promise对象组成的数组作为参数，</p><p>当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//ES6中对Promise.all()的理解以及应用场景</span>
<span class="token comment">//用于将多个Promise实例，包装成一个新的Promise实例</span>
<span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
   <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;成功01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;成功02&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> p3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;成功03&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//参数可以不是数组，但必须是iterator接口</span>
<span class="token keyword">let</span> pAll <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">,</span>p3<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pAll<span class="token punctuation">)</span>
<span class="token comment">//pAll的状态是由p1,p2,p3来决定，只有当这三个都为成功，pAll才会为成功,反之，但凡其中一个失败结果就是失败</span>
<span class="token comment">//这个时候第一个失败的实力的返回值会传递给pAll的回调函数，如果作为参数的实例，自己定义了catch方法，那么它一旦为rejected，是不会触碰到pAll中的catch方法</span>
pAll<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>案例1：模拟请求三个接口中的数据，全部请求成功后获取。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getUsersList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//模拟请求用户列表数据</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;用户列表的数据&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getBannersList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//模拟请求用户列表数据</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;轮播图的数据&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getVideoList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//模拟请求用户列表数据</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;视频列表的数据&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//初始加载的时候</span>
<span class="token keyword">function</span> <span class="token function">initLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> all <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">getUsersList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getBannersList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getVideoList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//获取成功请求的结果值</span>
    all<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">initLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>案例2：修改多文件读取代码</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> util <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;util&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> mywriteFile <span class="token operator">=</span> util<span class="token punctuation">.</span><span class="token function">promisify</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span>readFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> one <span class="token operator">=</span> <span class="token function">mywriteFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/1.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> two <span class="token operator">=</span> <span class="token function">mywriteFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/2.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> three <span class="token operator">=</span> <span class="token function">mywriteFile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/3.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>one<span class="token punctuation">,</span>two<span class="token punctuation">,</span>three<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_9-5-promise-race" tabindex="-1"><a class="header-anchor" href="#_9-5-promise-race" aria-hidden="true">#</a> 9.5 Promise.race()</h4><p>Promise.race race 赛跑的意思</p><p>参数: promise 数组</p><p>返回结果: promise 对象</p><p>状态由『最先改变状态的 promise对象』决定</p><p>结果值由 『最先改变状态的 promise对象』决定</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> p2 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> p3 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;oh hou&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">,</span> p3<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数。</p><p>不同的是，只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了。</p><p>而传递给then方法的值也会有所不同。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token comment">//ES6中Promise.race的用法以及使用场景</span>
    <span class="token comment">//将多个Promise实例包装成一个新的Promise实例</span>
    <span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> rejct</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;p1成功&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> rejct</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;p2成功&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//调用</span>
    <span class="token keyword">const</span> prace <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Promise.race区别于Promise.all：</span>
    <span class="token comment">//只要是实例中有一个先改变状态，就会把这个实例的返回值传递给prace的回调函数</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//使用场景：请求超时提示</span>
<span class="token keyword">function</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;请求成功&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">4000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;网络不畅,请求超时&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_9-6-promise-allsettled" tabindex="-1"><a class="header-anchor" href="#_9-6-promise-allsettled" aria-hidden="true">#</a> 9.6 Promise.allSettled()</h4><p>Promise.allSettled()方法，用来确定要一组异步操作是否都结束了(不管成功或失败)。</p><p>所以，它的名字叫&quot;Settled&quot;，包含了&quot;fufilled&quot;和&quot;rejected&quot;两种情况.</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token keyword">function</span> <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">&gt;=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> xhr<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
<span class="token comment">//类比Promise下的all方法和allSettled</span>
<span class="token comment">// Promise.all([ajax(&#39;http://www.xiongmaoyouxuan.com/api/tabs&#39;),</span>
<span class="token comment">// ajax(&#39;https://m.maizuo.com/gateway?cityId=110100&amp;k=4770248&#39;)</span>
<span class="token comment">// ]).then(value =&gt; {</span>
<span class="token comment">//     console.log(value)</span>
<span class="token comment">// }).catch(error =&gt; {</span>
<span class="token comment">//     console.log(error);</span>
<span class="token comment">// })</span>

Promise<span class="token punctuation">.</span><span class="token function">allSettled</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">ajax</span><span class="token punctuation">(</span><span class="token string">&#39;http://www.xiongmaoyouxuan.com/api/tabs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token string">&#39;https://m.maizuo.com/gateway?cityId=110100&amp;k=4770248&#39;</span><span class="token punctuation">)</span>
                   <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// console.log(value)</span>
    <span class="token keyword">let</span> successList <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">&#39;fulfilled&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>successList<span class="token punctuation">)</span>

    <span class="token keyword">let</span> errorList <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">&#39;rejected&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>errorList<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">error</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h4 id="_9-7-promise-any" tabindex="-1"><a class="header-anchor" href="#_9-7-promise-any" aria-hidden="true">#</a> 9.7 Promise.any()</h4><p>只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfiilled状态；</p><p>如果所有参数实例都变成rejected，包装实例就会变成rejected状态。</p><blockquote><p>Promise.any()跟Promise.race()方法很像，但是有一点不同，</p><p>就是Promise.any()不会因为某个Promise变成rejected状态而结束，</p><p>必须等到所有参数Promise变成rejected状态才会结束。</p></blockquote><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;okk&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> p3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    Promise<span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">,</span> p3<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h4 id="_9-8-promise-finally" tabindex="-1"><a class="header-anchor" href="#_9-8-promise-finally" aria-hidden="true">#</a> 9.8 Promise.finally()</h4><p>finally是在ES9(ES2018)中新增的一个特性：表示无论Promise对象变成fufilled还是rejected状态，最终都会被执行。</p><p>finally方法中的<code>回调函数</code>是不接受参数的，因为无论前面是fulfilled状态还是rejected状态， 它都是执行。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// resolve(&#39;ok&#39;);</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;finally&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="十、终止promise链条" tabindex="-1"><a class="header-anchor" href="#十、终止promise链条" aria-hidden="true">#</a> 十、终止Promise链条</h3><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//</span>
    <span class="token comment">// return false;</span>
    <span class="token comment">// throw &#39;出错啦&#39;;</span>
    <span class="token comment">//有且只有一种方式 返回一个pending状态的promise对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">333</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="十一、几个关键问题" tabindex="-1"><a class="header-anchor" href="#十一、几个关键问题" aria-hidden="true">#</a> 十一、几个关键问题</h3><h4 id="_11-1-如何修改-promise-对象状态" tabindex="-1"><a class="header-anchor" href="#_11-1-如何修改-promise-对象状态" aria-hidden="true">#</a> 11.1 如何修改 promise 对象状态</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token comment">//如何修改 promise 对象状态</span>
    <span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//1. resolve</span>
        <span class="token comment">// resolve(&#39;success&#39;);</span>
        <span class="token comment">//2. reject</span>
        <span class="token comment">// reject(&#39;error&#39;);</span>
        <span class="token comment">//3. 抛出错误 异常</span>
        <span class="token comment">// throw &#39;出问题啦! 你说出这样的话  你没有良心!!&#39;;</span>
        <span class="token comment">// 状态的改变只有一次 </span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h4 id="_11-2-指定多个回调执行情况" tabindex="-1"><a class="header-anchor" href="#_11-2-指定多个回调执行情况" aria-hidden="true">#</a> 11.2 指定多个回调执行情况</h4><p>问题：一个promise指定多个成功/失败回调函数，都会调用吗？</p><p>答：会，但是前提是当promise对象的状态改变(fulfilled/rejected)时才会调用</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
        <span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">//promise对象是可以多次调用then方法完成多个成功/失败回调函数</span>
            <span class="token comment">//但是使用的前提是这个promise对象的状态必须要么是fulfilled或者是rejected</span>
            <span class="token comment">//不能是pending</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;OK&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
		
        <span class="token comment">//第一次指定回调</span>
        p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">alert</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">alert</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h4 id="_11-3-指定回调与改变状态先后顺序问题" tabindex="-1"><a class="header-anchor" href="#_11-3-指定回调与改变状态先后顺序问题" aria-hidden="true">#</a> 11.3 指定回调与改变状态先后顺序问题</h4><p>改变promise状态和指定回调函数执行谁先谁后？</p><ul><li><p>都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态在指定回调</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//若执行器函数中是异步任务, 则先指定回调, 然后再改变状态  更为常见</span>
<span class="token comment">//若执行器函数中是同步任务, 则先改变状态, 然后再指定回调</span>
<span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//同步任务</span>
    <span class="token comment">//resolve(&#39;ok&#39;);</span>
    <span class="token comment">//异步任务</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>如何先改状态再指定回调？</p><ul><li>在执行器中直接调用resolve()/reject()</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token comment">//resolve(&#39;ok&#39;);</span>
	<span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>延迟更长时间才调用then()</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//then方法使用定时器延迟更久的时间</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
</code></pre></div></li><li><p>什么时候才能得到数据？</p><ul><li>如果是先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据</li><li>如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据</li></ul></li></ul><h4 id="_11-4-promise-then-返回的新promise的结果状态由什么决定" tabindex="-1"><a class="header-anchor" href="#_11-4-promise-then-返回的新promise的结果状态由什么决定" aria-hidden="true">#</a> 11.4 promise.then()返回的新promise的结果状态由什么决定？</h4><ul><li>简单表达：由then指定的回调函数执行的结果决定</li><li>详细表达： <ul><li>如果抛出异常：新promise对象状态变成rejected，reason为抛出的异常</li><li>如果返回的是是非promise的任意值，新promise对象状态变成fulfilled，value为返回的值</li><li>如果返回的是另一个新的promise对象，此promise的结果就会称为新promise的结果</li></ul></li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//return value;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;okk&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_11-5-promise如何串联多个操作任务" tabindex="-1"><a class="header-anchor" href="#_11-5-promise如何串联多个操作任务" aria-hidden="true">#</a> 11.5 promise如何串联多个操作任务?</h4><ul><li>promise的then()返回一个新的promise对象，可以写成then()方法的链式调用</li><li>通过then()的链式调用串联多个同步/异步任务</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre></div><h4 id="_11-6-promise的异常穿透" tabindex="-1"><a class="header-anchor" href="#_11-6-promise的异常穿透" aria-hidden="true">#</a> 11.6 promise的异常穿透</h4><ul><li>当使用promise的then链式调用时, 可以在最后指定失败的回调,</li><li>前面任何操作出了异常, 都会传到最后失败的回调中处理</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_11-7-中断promise链" tabindex="-1"><a class="header-anchor" href="#_11-7-中断promise链" aria-hidden="true">#</a> 11.7 中断promise链</h4><ul><li>当使用promise的then链式调用时, 在中间中断, 不再调用后面的回调函数</li><li>办法: 在回调函数中返回一个pending状态的promise对象</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="十二、async和await" tabindex="-1"><a class="header-anchor" href="#十二、async和await" aria-hidden="true">#</a> 十二、async和await</h3><p>async/await 是ES7提出的基于Promise的解决异步的最终方案。</p><h4 id="_12-1-async函数" tabindex="-1"><a class="header-anchor" href="#_12-1-async函数" aria-hidden="true">#</a> 12.1 async函数</h4><p>async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。</p><p>因此对async函数可以直接then，返回值就是then方法传入的函数。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// async基础语法</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fun0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">fun0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token comment">// 1,1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Promise&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;Promise&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">val</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise Promise</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//声明一个async函数</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//情况1：返回非promise对象数据</span>
    <span class="token keyword">return</span> <span class="token string">&#39;hahaha&#39;</span><span class="token punctuation">;</span>
    <span class="token comment">//情况2：返回是promise对象数据</span>
    <span class="token comment">/* return new Promise((resolve, reject) =&gt; {
		// resolve(&#39;ok&#39;);
		reject(&#39;error&#39;);
	}) */</span>
    <span class="token comment">//情况3：抛出异常</span>
    <span class="token comment">// throw new Error(&#39;出错啦!!!&#39;);</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_12-2-await表达式" tabindex="-1"><a class="header-anchor" href="#_12-2-await表达式" aria-hidden="true">#</a> 12.2 await表达式</h4><p>await 也是一个修饰符，只能放在async定义的函数内。可以理解为<strong>等待</strong>。</p><p>await 修饰的如果是Promise对象，可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语</p><p>句才会往下执行；如果不是Promise对象：把这个非promise的东西当做await表达式的结果。</p><p>注意事项</p><ul><li>await必须写在async函数中，但是async函数中可以没有await</li><li>如果await的promise失败了，就会抛出异常，需要通过try...catch捕获处理</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;function&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3秒后输出： 1 &quot;setTimeout&quot; &quot;function&quot;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>time<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// 立即输出 undefined 1</span>
<span class="token comment">// 1秒后输出 1000</span>
<span class="token comment">// 2秒后输出 2000</span>
<span class="token comment">// 3秒后输出 3000</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//1、如果await右侧为非promise类型数据</span>
    <span class="token keyword">var</span> rs <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> rs <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> rs <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token string">&quot;非常6+7&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">//2、如果await右侧为promise成功类型数据</span>
    <span class="token keyword">var</span> rs <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">//3、如果await右侧为promise失败类型数据,需要借助于try...catch捕获</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> rs <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用async/await获取成功的结果</span>

<span class="token comment">// 定义一个异步函数，3秒后才能获取到值(类似操作数据库)</span>
<span class="token keyword">function</span> <span class="token function">getSomeThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;获取成功&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getSomeThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3秒后输出：获取成功</span>
</code></pre></div><p>案例：async结合await读取文件内容</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//1、导包</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>promisify<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;util&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//2、将fs.readFile转化成promise风格的函数</span>
<span class="token keyword">const</span> myreadfile <span class="token operator">=</span> <span class="token function">promisify</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span>readFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//3、声明async函数</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token comment">//4、读取文件</span>
        <span class="token keyword">let</span> one <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">myreadfile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/4.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> two <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">myreadfile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/2.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> three <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">myreadfile</span><span class="token punctuation">(</span><span class="token string">&#39;./resource/3.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//5、拼接读取文件内容</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>one <span class="token operator">+</span> two <span class="token operator">+</span> three<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//6、调用main函数</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="十三、js中的宏队列与微队列" tabindex="-1"><a class="header-anchor" href="#十三、js中的宏队列与微队列" aria-hidden="true">#</a> 十三、JS中的宏队列与微队列</h3><ul><li>说明 <ul><li>JS中用来存储待执行回调函数的队列包含2个不同特定的列队</li><li>宏列队: 用来保存待执行的宏任务(回调), 比如: 定时器回调/DOM事件回调/ajax回调</li><li>微列队: 用来保存待执行的微任务(回调), 比如: promise的回调/MutationObserver的回调</li><li>JS执行时会区别这2个队列 <ul><li>JS引擎首先必须先执行所有的初始化同步任务代码</li><li>每次准备取出第一个宏任务执行前, 都要将所有的微任务一个一个取出来执行</li></ul></li></ul></li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//return ;throw</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">333</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="十四、promise常见面试题" tabindex="-1"><a class="header-anchor" href="#十四、promise常见面试题" aria-hidden="true">#</a> 十四、Promise常见面试题</h3><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">first</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;4&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;5&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;6&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;7&quot;</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;8&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="十五、手写promise自定义基础结构的搭建" tabindex="-1"><a class="header-anchor" href="#十五、手写promise自定义基础结构的搭建" aria-hidden="true">#</a> 十五、手写promise自定义基础结构的搭建</h3><h4 id="_15-1-promise-的基本结构" tabindex="-1"><a class="header-anchor" href="#_15-1-promise-的基本结构" aria-hidden="true">#</a> 15.1 Promise 的基本结构</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 1- Promise 是一个构造函数
 * 2- Promise 接收一个参数，该参数的类型是函数（执行器函数executor）
 * 3- executor接收两个参数（resolve,reject）,参数的类型是函数
 * 4- 执行器函数会同步执行。
 * 5- then方法在其显式原型属性上
 */</span>

<span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// executor是执行器函数</span>
    <span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;这是我的执行器函数&quot;</span><span class="token punctuation">,</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;over&quot;</span><span class="token punctuation">,</span>Promise<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-2-promise实例拥有两个实例属性" tabindex="-1"><a class="header-anchor" href="#_15-2-promise实例拥有两个实例属性" aria-hidden="true">#</a> 15.2 Promise实例拥有两个实例属性</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * 1- Promise实例拥有两个实例属性：
 * 状态（[[PromiseState]]），初始状态为pending
 * 值（[[PromiseResult]]）,初始值为undefined
*/</span> 
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;这是我的执行器函数&quot;</span><span class="token punctuation">,</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-3-更改状态三种方式-方法未抽离" tabindex="-1"><a class="header-anchor" href="#_15-3-更改状态三种方式-方法未抽离" aria-hidden="true">#</a> 15.3 更改状态三种方式-方法未抽离</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * 更改状态三种方式
 * 1- 通过调用resolve将状态更改为成功（fulfilled），接收的值为成功值
 * 2- 通过调用reject将状态更改为失败(rejected)，接收的值为失败值
 * 3- 抛出异常将状态更改为失败(rejected)，失败的值为异常信息。
*/</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">// 将状态更改为成功(fulfilled)</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
				<span class="token comment">// 成功值为value</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">// 将状态更改为失败</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
				<span class="token comment">// 将result设置为value</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将异常信息作为失败值</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> err<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token comment">// reject(2);</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-4-更改状态三种方式-抽离为普通函数" tabindex="-1"><a class="header-anchor" href="#_15-4-更改状态三种方式-抽离为普通函数" aria-hidden="true">#</a> 15.4 更改状态三种方式-抽离为普通函数</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将异常信息作为失败值</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> err<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// throw &quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-5-更改状态三种方式-抽离为箭头函数" tabindex="-1"><a class="header-anchor" href="#_15-5-更改状态三种方式-抽离为箭头函数" aria-hidden="true">#</a> 15.5 更改状态三种方式-抽离为箭头函数</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将异常信息作为失败值</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> err<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token comment">// reject(2);</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-6-状态只允许更改一次" tabindex="-1"><a class="header-anchor" href="#_15-6-状态只允许更改一次" aria-hidden="true">#</a> 15.6 状态只允许更改一次</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * pending-&gt; fulfilled
 * pending-&gt; rejected
 * 改变状态只有这两种，且一个promise对象只能改变一次，，无论变成成功还是失败，都会有一个结果值
 * 成功的结果数据一般称为value，失败的结果值一般称为reason
*/</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-7-then函数调用成功或失败回调函数" tabindex="-1"><a class="header-anchor" href="#_15-7-then函数调用成功或失败回调函数" aria-hidden="true">#</a> 15.7 then函数调用成功或失败回调函数</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * 1- then是Promise中的原型方法
 * 2- then函数接收两个参数（成功回调，失败回调）
 * 3- 如果p1状态为成功执行成功回调，失败执行失败回调。
*/</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 状态成功调用onResolved</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-8-then函数中的回调函数是异步调用的" tabindex="-1"><a class="header-anchor" href="#_15-8-then函数中的回调函数是异步调用的" aria-hidden="true">#</a> 15.8 then函数中的回调函数是异步调用的</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 状态成功调用onResolved</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">// 异步调用</span>
				<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
				
			<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">// 异步调用</span>
				<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token comment">// reject(2);</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;成功回调&quot;</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败回调&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;over&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-9-then函数返回的是一个promise实例" tabindex="-1"><a class="header-anchor" href="#_15-9-then函数返回的是一个promise实例" aria-hidden="true">#</a> 15.9 then函数返回的是一个Promise实例</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token comment">// 异步调用</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
					
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token comment">// 异步调用</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token comment">// reject(2);</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;成功回调&quot;</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败回调&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-10-then函数返回的promise实例状态以及值-未优化" tabindex="-1"><a class="header-anchor" href="#_15-10-then函数返回的promise实例状态以及值-未优化" aria-hidden="true">#</a> 15.10 then函数返回的Promise实例状态以及值-未优化</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * then返回的Promise实例受成功或失败回调函数返回值的影响
 * 1- 如果返回的是非Promise,那么p2状态为成功，值为返回值
 * 2- 如果返回的是Promise,那么p2状态以及值与返回的状态，值相同。
 * 3- 如果出现异常，那么p2状态为失败，值为异常信息。
*/</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token comment">// 异步调用</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
								<span class="token comment">// value.then(v=&gt;{</span>
								<span class="token comment">// 	// 将返回的Promise实例设置为成功，值为v</span>
								<span class="token comment">// 	resolve(v);</span>
								<span class="token comment">// },s=&gt;{</span>
								<span class="token comment">// 	// 将返回的Promise实例设置为失败，值为s</span>
								<span class="token comment">// 	reject(s);</span>
								<span class="token comment">// })</span>
								
								<span class="token comment">// 简化：</span>
								value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
							<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
					
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token comment">// 异步调用</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是失败回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// value是否为Promise实例</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
								<span class="token comment">// 将返回Promise设置为与value相同的结果</span>
								value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 返回成功promise,值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 返回失败promise,值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// throw &quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">// resolve(100)</span>
        <span class="token comment">// reject(200)</span>
        <span class="token keyword">throw</span> <span class="token string">&quot;异常2&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// return 1;</span>
    <span class="token comment">// console.log(&quot;成功回调&quot;,value);</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">// resolve(100);</span>
        <span class="token comment">// reject(2)</span>
        <span class="token keyword">throw</span> <span class="token string">&quot;异常3&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// return 1;</span>
    <span class="token comment">// console.log(&quot;失败回调&quot;,reason);</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-11-then函数返回的promise实例状态以及值-优化封装函数-common" tabindex="-1"><a class="header-anchor" href="#_15-11-then函数返回的promise实例状态以及值-优化封装函数-common" aria-hidden="true">#</a> 15.11 then函数返回的Promise实例状态以及值-优化封装函数_common</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
								value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// resolve(1);</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// throw &quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// return new Promise((resolve,reject)=&gt;{</span>
    <span class="token comment">// 	// resolve(100)</span>
    <span class="token comment">// 	// reject(200)</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常2&quot;</span>
    <span class="token comment">// })</span>
    <span class="token comment">// return 1;</span>
    <span class="token comment">// console.log(&quot;成功回调&quot;,value);</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// return new Promise((resolve,reject)=&gt;{</span>
    <span class="token comment">// 	// resolve(100);</span>
    <span class="token comment">// 	// reject(2)</span>
    <span class="token comment">// 	throw &quot;异常3&quot;</span>
    <span class="token comment">// })</span>
    <span class="token comment">// return 1;</span>
    <span class="token comment">// console.log(&quot;失败回调&quot;,reason);</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-12-增加成功与失败回调函数的默认值" tabindex="-1"><a class="header-anchor" href="#_15-12-增加成功与失败回调函数的默认值" aria-hidden="true">#</a> 15.12 增加成功与失败回调函数的默认值</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * 1- then如果省略成功回调，默认成功回调为 value=&gt;value;
 * 2- then如果省略失败回调，默认失败回调为 reason=&gt;{throw reason};
*/</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 立即调用函数的好处：可以避免对外部的变量造成污染。</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
								value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// reject(2);</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-14-执行器函数常用于处理异步行为" tabindex="-1"><a class="header-anchor" href="#_15-14-执行器函数常用于处理异步行为" aria-hidden="true">#</a> 15.14 执行器函数常用于处理异步行为</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_15-15-可以指定多个成功或失败的回调" tabindex="-1"><a class="header-anchor" href="#_15-15-可以指定多个成功或失败的回调" aria-hidden="true">#</a> 15.15 可以指定多个成功或失败的回调</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 可以指定多个成功或失败的回调</span>
<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;成功1&quot;</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败1&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;成功2&quot;</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败2&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;成功3&quot;</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败3&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;成功4&quot;</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;失败4&quot;</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_15-16-catch" tabindex="-1"><a class="header-anchor" href="#_15-16-catch" aria-hidden="true">#</a> 15.16 catch</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 可以指定多个成功或失败的回调</span>
<span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// p1.then(undefined,reason=&gt;{</span>
<span class="token comment">// 	console.log(reason);</span>
<span class="token comment">// })</span>
<span class="token comment">// catch的返回值是Promise实例,实例的属性与值取决于回调函数的返回值</span>
<span class="token comment">// 返回值为非Promise实例，那么得到的状态为成功，值为返回值</span>
<span class="token comment">// 返回值为Promise实例，那么得到的结果与返回的结果相同。</span>
<span class="token comment">// 有异常，那么得到的状态为失败，值为异常信息。</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> p1<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">// console.log(reason);</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// throw &quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-17-链式调用支持" tabindex="-1"><a class="header-anchor" href="#_15-17-链式调用支持" aria-hidden="true">#</a> 15.17 链式调用支持</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 1</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 2</span>
    <span class="token keyword">return</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 3</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 4</span>
    <span class="token keyword">return</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_15-18-异常穿透支持" tabindex="-1"><a class="header-anchor" href="#_15-18-异常穿透支持" aria-hidden="true">#</a> 15.18 异常穿透支持</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token string">&quot;异常&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 3</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 4</span>
    <span class="token keyword">return</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_15-19-中断promise链" tabindex="-1"><a class="header-anchor" href="#_15-19-中断promise链" aria-hidden="true">#</a> 15.19 中断Promise链</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 1</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 2</span>
    <span class="token comment">// 在回调函数中返回一个\`pendding\`状态的promise对象</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// undefined</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 4</span>
    <span class="token keyword">return</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="_15-20-resolve" tabindex="-1"><a class="header-anchor" href="#_15-20-resolve" aria-hidden="true">#</a> 15.20 resolve</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	Promise<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> value<span class="token punctuation">;</span><span class="token comment">// 如果是Promise实例直接返回</span>
		<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果不是Promise实例，那么返回的状态为成功，值为value</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// const p1 = Promise.resolve(1);</span>
<span class="token comment">// console.log(p1);</span>

<span class="token comment">// const p1 = Promise.resolve(new Promise((resolve,reject)=&gt;{</span>
<span class="token comment">// 	resolve(2);</span>
<span class="token comment">// }));</span>
<span class="token comment">// console.log(p1);</span>
<span class="token comment">//</span>
<span class="token comment">// const p1 = Promise.resolve(new Promise((resolve,reject)=&gt;{</span>
<span class="token comment">// 	reject(2);</span>
<span class="token comment">// }));</span>
<span class="token comment">// console.log(p1);</span>


<span class="token keyword">const</span> p <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p1 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token operator">===</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-21-reject" tabindex="-1"><a class="header-anchor" href="#_15-21-reject" aria-hidden="true">#</a> 15.21 reject</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// executor是执行器函数</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 记录成功与失败回调函数</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性state,初始值为pending</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义实例属性result,初始值为undefined</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
		<span class="token comment">// 定义resolve函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为成功(fulfilled)</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 成功值为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 定义reject函数</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token comment">// 当状态已经被更改过，不允许再次更改</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token comment">// 将状态更改为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span>
			<span class="token comment">// 将result设置为value</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span><span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span>_reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 状态更改为失败，值为异常信息</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token punctuation">{</span>
		<span class="token comment">// onResolved:成功回调</span>
		<span class="token comment">// onRejected:失败回调</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span>onRejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果成功回调不是函数，那么增加成功回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span><span class="token operator">=&gt;</span>value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 如果失败回调不是函数，那么增加失败回调默认值</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token keyword">throw</span> reason<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span><span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调的返回值</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断value是不是通过Promise实例化出来的（判断value是否为Promise实例）</span>
							<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">else</span><span class="token punctuation">{</span>
								<span class="token comment">// 不是Promise实例，将返回的Promise状态设置为成功，值为value</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token comment">// 有异常，将返回Promise的状态更改为失败，值为err</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 状态成功调用onResolved</span>
				<span class="token comment">// p1的状态为成功</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
					<span class="token comment">// pending</span>
					<span class="token comment">// 如果状态为pending,那么保存成功与失败回调</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span><span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	Promise<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> value<span class="token punctuation">;</span><span class="token comment">// 如果是Promise实例直接返回</span>
		<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果不是Promise实例，那么返回的状态为成功，值为value</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	Promise<span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token function">reject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p2 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p3 <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-22-完成all" tabindex="-1"><a class="header-anchor" href="#_15-22-完成all" aria-hidden="true">#</a> 15.22 完成all</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 接收执行器函数(executor)，执行器函数会同步执行（立即执行）。</span>
	<span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span><span class="token comment">// 初始状态</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span><span class="token comment">// 初始值</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">// _resolve函数将状态更新为成功，成功值为接收的value</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token comment">// 如果状态已经更改，直接跳出函数体</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span><span class="token comment">// 状态更新为成功</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span><span class="token comment">// 更新成功值</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// _reject函数将状态更新为失败，失败值为接收的value</span>
		<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token comment">// 如果状态已经更改，直接跳出函数体</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span><span class="token comment">// 状态更新为失败</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span><span class="token comment">// 更新失败值</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span> _reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 如果有异常，将状态更新为失败，失败的值为异常信息</span>
			<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 将第二个参数（对象）合并至Promise.prototype对象中。</span>
	Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">{</span>
		<span class="token comment">// 1- 接收成功与失败回调函数</span>
		<span class="token comment">// 2- 返回的是一个Promise实例</span>
		<span class="token comment">// 3- onResolved成功回调，默认值为value=&gt;value;</span>
		<span class="token comment">// 4- onRejected失败回调，默认值为reason=&gt;{throw reason};</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// onResolved成功回调，默认值为value=&gt;value;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value<span class="token punctuation">;</span>
			<span class="token comment">//onRejected失败回调，默认值为reason=&gt;{throw reason};</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token keyword">throw</span> reason
			<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token comment">// callback是成功或失败回调</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span> <span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调返回结果</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断是否为Promise实例</span>
							<span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
								value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
								<span class="token comment">// 非Promise实例</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
					
				<span class="token punctuation">}</span>
				<span class="token comment">// 判断状态为成功，调用成功回调</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">else</span> <span class="token punctuation">{</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	Promise<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 判断接收的参数是否为Promise实例，如果是直接返回</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> value<span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
			<span class="token comment">// 如果不是，创建一个新的Promise,状态为成功，值为value;</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	Promise<span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 返回失败的Promise,失败值为接收的value</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			<span class="token function">reject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 1- 接收的是数组，返回的是Promise</span>
	Promise<span class="token punctuation">.</span><span class="token function-variable function">all</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">promiseArr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">let</span> successArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>promiseArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			promiseArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span>i</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					index<span class="token operator">++</span><span class="token punctuation">;</span>
					successArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">;</span>
					<span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> promiseArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
						<span class="token function">resolve</span><span class="token punctuation">(</span>successArr<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">s</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token comment">// 返回Promise的状态设置失败</span>
					<span class="token function">reject</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// all接收的数组中的元素是Promise实例。</span>
<span class="token comment">// 元素中的Promise实例都成功，p的状态为成功，值为数组，数组的元素为成功值</span>
<span class="token comment">// 元素中有一个失败，那么p的状态为失败，值为失败值</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">,</span>p3<span class="token punctuation">,</span>p4<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-23-完成race" tabindex="-1"><a class="header-anchor" href="#_15-23-完成race" aria-hidden="true">#</a> 15.23 完成race</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 接收执行器函数(executor)，执行器函数会同步执行（立即执行）。</span>
    <span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span><span class="token comment">// 初始状态</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span><span class="token comment">// 初始值</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// _resolve函数将状态更新为成功，成功值为接收的value</span>
        <span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果状态已经更改，直接跳出函数体</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span><span class="token comment">// 状态更新为成功</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span><span class="token comment">// 更新成功值</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// _reject函数将状态更新为失败，失败值为接收的value</span>
        <span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果状态已经更改，直接跳出函数体</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span><span class="token comment">// 状态更新为失败</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span><span class="token comment">// 更新失败值</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span> _reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果有异常，将状态更新为失败，失败的值为异常信息</span>
            <span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 将第二个参数（对象）合并至Promise.prototype对象中。</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1- 接收成功与失败回调函数</span>
        <span class="token comment">// 2- 返回的是一个Promise实例</span>
        <span class="token comment">// 3- onResolved成功回调，默认值为value=&gt;value;</span>
        <span class="token comment">// 4- onRejected失败回调，默认值为reason=&gt;{throw reason};</span>
        <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// onResolved成功回调，默认值为value=&gt;value;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value<span class="token punctuation">;</span>
            <span class="token comment">//onRejected失败回调，默认值为reason=&gt;{throw reason};</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> reason
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// callback是成功或失败回调</span>
                <span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                        <span class="token keyword">try</span> <span class="token punctuation">{</span>
                            <span class="token comment">// value是成功回调返回结果</span>
                            <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token comment">// 判断是否为Promise实例</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                                <span class="token comment">// 非Promise实例</span>
                                <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>

                <span class="token punctuation">}</span>
                <span class="token comment">// 判断状态为成功，调用成功回调</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                        <span class="token literal-property property">onResolved</span><span class="token operator">:</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">onRejected</span><span class="token operator">:</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    Promise<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 判断接收的参数是否为Promise实例，如果是直接返回</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> value<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token comment">// 如果不是，创建一个新的Promise,状态为成功，值为value;</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    Promise<span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 返回失败的Promise,失败值为接收的value</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 1- 接收的是数组，返回的是Promise</span>
    Promise<span class="token punctuation">.</span><span class="token function-variable function">all</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">promiseArr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> successArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>promiseArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            promiseArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span>i</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                    index<span class="token operator">++</span><span class="token punctuation">;</span>
                    successArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">;</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> promiseArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token function">resolve</span><span class="token punctuation">(</span>successArr<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">s</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                    <span class="token comment">// 返回Promise的状态设置失败</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    Promise<span class="token punctuation">.</span><span class="token function-variable function">race</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">promiseArr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            promiseArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token comment">// value.then(v=&gt;{</span>
                <span class="token comment">// 	resolve(v);</span>
                <span class="token comment">// },s=&gt;{</span>
                <span class="token comment">// 	reject(s);</span>
                <span class="token comment">// })</span>
                value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// race:返回的是Promise实例，谁先执行完就与谁的状态以及值相同。</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">,</span>p3<span class="token punctuation">,</span>p4<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_15-24-class版本实现promise" tabindex="-1"><a class="header-anchor" href="#_15-24-class版本实现promise" aria-hidden="true">#</a> 15.24 class版本实现Promise</h4><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 1-将之前构造函数体内的语句放置到constructor函数中</span>
	<span class="token comment">// 2-将之前prototype的属性直接放置到Promise中</span>
	<span class="token keyword">class</span> <span class="token class-name">Promise</span><span class="token punctuation">{</span>
		<span class="token keyword">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 判断接收的参数是否为Promise实例，如果是直接返回</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">return</span> value<span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
				<span class="token comment">// 如果不是，创建一个新的Promise,状态为成功，值为value;</span>
				<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">static</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token comment">// 返回失败的Promise,失败值为接收的value</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				<span class="token function">reject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">static</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">promiseArr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
			<span class="token keyword">let</span> successArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>promiseArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				promiseArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span>i</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						index<span class="token operator">++</span><span class="token punctuation">;</span>
						successArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">;</span>
						<span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">===</span> promiseArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
							<span class="token function">resolve</span><span class="token punctuation">(</span>successArr<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">s</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token comment">// 返回Promise的状态设置失败</span>
						<span class="token function">reject</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">static</span> <span class="token function">race</span><span class="token punctuation">(</span><span class="token parameter">promiseArr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
				promiseArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					<span class="token comment">// value.then(v=&gt;{</span>
					<span class="token comment">// 	resolve(v);</span>
					<span class="token comment">// },s=&gt;{</span>
					<span class="token comment">// 	reject(s);</span>
					<span class="token comment">// })</span>
					value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">;</span><span class="token comment">// 初始状态</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span><span class="token comment">// 初始值</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token comment">// _resolve函数将状态更新为成功，成功值为接收的value</span>
			<span class="token keyword">const</span> <span class="token function-variable function">_resolve</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token comment">// 如果状态已经更改，直接跳出函数体</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">;</span><span class="token comment">// 状态更新为成功</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span><span class="token comment">// 更新成功值</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					item<span class="token punctuation">.</span><span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// _reject函数将状态更新为失败，失败值为接收的value</span>
			<span class="token keyword">const</span> <span class="token function-variable function">_reject</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token comment">// 如果状态已经更改，直接跳出函数体</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">!==</span> <span class="token string">&quot;pending&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">;</span><span class="token comment">// 状态更新为失败</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> value<span class="token punctuation">;</span><span class="token comment">// 更新失败值</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
					item<span class="token punctuation">.</span><span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token function">executor</span><span class="token punctuation">(</span>_resolve<span class="token punctuation">,</span> _reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// 如果有异常，将状态更新为失败，失败的值为异常信息</span>
				<span class="token function">_reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onResolved<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// onResolved成功回调，默认值为value=&gt;value;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onResolved <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function-variable function">onResolved</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value<span class="token punctuation">;</span>
			<span class="token comment">//onRejected失败回调，默认值为reason=&gt;{throw reason};</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>onRejected <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function-variable function">onRejected</span> <span class="token operator">=</span> <span class="token parameter">reason</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token keyword">throw</span> reason
			<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token comment">// callback是成功或失败回调</span>
				<span class="token keyword">const</span> <span class="token function-variable function">_common</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
						<span class="token keyword">try</span> <span class="token punctuation">{</span>
							<span class="token comment">// value是成功回调返回结果</span>
							<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token comment">// 判断是否为Promise实例</span>
							<span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
								value<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
								<span class="token comment">// 非Promise实例</span>
								<span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
							<span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
					
				<span class="token punctuation">}</span>
				<span class="token comment">// 判断状态为成功，调用成功回调</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;fulfilled&quot;</span><span class="token punctuation">)</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onResolved<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&quot;rejected&quot;</span><span class="token punctuation">)</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">else</span> <span class="token punctuation">{</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>callbackFn<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">onResolved</span><span class="token operator">:</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onResolved<span class="token punctuation">)</span><span class="token punctuation">,</span>
						<span class="token literal-property property">onRejected</span><span class="token operator">:</span> <span class="token function">_common</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> onRejected<span class="token punctuation">)</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">catch</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span>onRejected<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	window<span class="token punctuation">.</span>Promise <span class="token operator">=</span> Promise<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> p4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// race:返回的是Promise实例，谁先执行完就与谁的状态以及值相同。</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">[</span>p1<span class="token punctuation">,</span>p2<span class="token punctuation">,</span>p3<span class="token punctuation">,</span>p4<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,259),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","index.html.vue"]]);export{i as default};
