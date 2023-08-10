import{_ as p,p as t,q as o,R as a,a1 as n}from"./framework-5866ffd3.js";const e={},c=n('<h1 id="队列" tabindex="-1"><a class="header-anchor" href="#队列" aria-hidden="true">#</a> 队列</h1><blockquote><p>队列就类似于我们日常生活中，去银行排队取钱的场景。来得早的人总是先排队，后来的人则需要排到队伍后面等待前面的人被服务完，这便是<strong>先进先出原则</strong>。</p></blockquote><h3 id="队列-queue-介绍" tabindex="-1"><a class="header-anchor" href="#队列-queue-介绍" aria-hidden="true">#</a> 队列(Queue)介绍</h3><ul><li>队列是一个有序列表，可以用<strong>数组</strong>或<strong>链表</strong>来实现。</li><li>遵循<strong>先入先出</strong>的原则。</li></ul>',4),u=["src"],l=n('<blockquote><p>上图就是利用数组模拟队列的示意图</p></blockquote><h3 id="数组模拟队列思路" tabindex="-1"><a class="header-anchor" href="#数组模拟队列思路" aria-hidden="true">#</a> 数组模拟队列思路</h3><ul><li>队列本身是有序列表，若使用数组的结构来存储队列的数据，则队列数组的声明如下图，其中maxSize是该队列的最大容量。</li><li>因为队列的输出、输入是分别从前后端来处理，因此需要两个变量<strong>front</strong>以及<strong>rear</strong>分别<strong>记录队列前后端的下标</strong>，front会随着数据输出而改变，而rear则是随着数据输入而改变。</li></ul>',3),k=["src"],i=n(`<ul><li>当我们将数据存入队列时称为 &quot;add&quot;, add的处理需要有两个步骤 <ul><li>将尾指针 rear 往后移：rear + 1,当front == rear时，队列为空</li><li>若尾指针rear小于队列的最大下标maxSize - 1时则将数据存入rear所指的数组元素中，否则队列为满无法存入数据。</li></ul></li></ul><h3 id="数组模拟队列代码实现" tabindex="-1"><a class="header-anchor" href="#数组模拟队列代码实现" aria-hidden="true">#</a> 数组模拟队列代码实现</h3><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">club<span class="token punctuation">.</span>zhilin<span class="token punctuation">.</span>structure<span class="token punctuation">.</span>queue</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> zhilin
 * <span class="token keyword">@since</span> 2022/3/9 13:35
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayQueue</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 表示队列的最大容量
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> maxSize<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 指向队列头
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> front<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 指向队列尾
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> rear<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 队列中的数据
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 初始化队列
     *
     * <span class="token keyword">@param</span> <span class="token parameter">maxSize</span> 队列的最大容量
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ArrayQueue</span><span class="token punctuation">(</span><span class="token keyword">int</span> maxSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize <span class="token operator">=</span> maxSize<span class="token punctuation">;</span>
        data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
        front <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        rear <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断队列是否已满
     *
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>rear <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断队列是否为空
     *
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>rear <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>front<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 添加数据到队列中
     *
     * <span class="token keyword">@param</span> <span class="token parameter">val</span> 需要添加的值
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断队列是否为满</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;队列已满&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token operator">++</span>rear<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 从队列中取出一个数据
     *
     * <span class="token keyword">@return</span> 数据
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断队列是否为空</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;队列为空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token operator">++</span>front<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 显示队列头部数据
     *
     * <span class="token keyword">@return</span> int
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">peak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span>front <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 展示队列中所有数据
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;队列为空,没有数据&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;[&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><blockquote><p>📌需要注意的是以上是一个一次性队列，当数据存满之后即使把数据全部取出来也不能再次添加数据。</p></blockquote><h3 id="数组模拟环形队列" tabindex="-1"><a class="header-anchor" href="#数组模拟环形队列" aria-hidden="true">#</a> 数组模拟环形队列</h3><blockquote><p>环形队列是对前面的数组模拟队列的优化，充分利用数组。利用取模实现，将数组形成一个环形。</p></blockquote><h3 id="数组模拟环形队列思路" tabindex="-1"><a class="header-anchor" href="#数组模拟环形队列思路" aria-hidden="true">#</a> 数组模拟环形队列思路</h3>`,7),r=["src"],d=n(`<ul><li>front变量的含义做出调整：front就指向队列的第一个元素，也就是说arr[front] 就是队列的第一个元素，front 的初始值为0</li><li>rear变量的含义也做出调整：rear指向队列的最后一个元素的后一个位置。因为希望空出一个空间作为约定，rear的初始值为0</li><li>队列满条件调整为 (rear + 1) % maxSize == front </li><li>队列空的条件不变</li><li>当我们这样分析，队列中有效的数据个数为 ( rear + maxSize - front ) % maxSize </li></ul><h3 id="数组模拟环形队列代码实现" tabindex="-1"><a class="header-anchor" href="#数组模拟环形队列代码实现" aria-hidden="true">#</a> 数组模拟环形队列代码实现</h3><p></p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">club<span class="token punctuation">.</span>zhilin<span class="token punctuation">.</span>structure<span class="token punctuation">.</span>queue</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> zhilin
 * <span class="token keyword">@since</span> 2022/3/9 16:08
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CircleArrayQueue</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 表示队列的最大容量
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> maxSize<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 指向队列头
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> front<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 指向队列尾
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> rear<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 队列中的数据
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 初始化 maxSize 时总是比用户输入的数值 + 1,实际上是为了用户体验，能够保证队列可以容纳用户输入的最大容量个数据
     * 初始化环形队列，此处不在初始化 front 和 rear 因为 int 默认值为0
     * <span class="token keyword">@param</span> <span class="token parameter">maxSize</span> 队列最大容量
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">CircleArrayQueue</span><span class="token punctuation">(</span><span class="token keyword">int</span> maxSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize <span class="token operator">=</span> maxSize <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>maxSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断环形队列是否已满
     *
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rear <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> maxSize <span class="token operator">==</span> front<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断环形队列是否为空
     *
     * <span class="token keyword">@return</span> boolean
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>rear <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>front<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 添加数据到队列
     *
     * <span class="token keyword">@param</span> <span class="token parameter">val</span> 数据
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断队列是否为满</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;队列已满&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 直接添加数据并将 rear 指针后移</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span>rear<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
        rear <span class="token operator">=</span> <span class="token punctuation">(</span>rear <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> maxSize<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 从队列顶部取出一个数据
     *
     * <span class="token keyword">@return</span> 从队列中取出的数据
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;队列为空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span>front<span class="token punctuation">]</span><span class="token punctuation">;</span>
        front <span class="token operator">=</span> <span class="token punctuation">(</span>front <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> maxSize<span class="token punctuation">;</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 打印队列
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;队列为空,没有数据&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;[&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> front<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> front <span class="token operator">+</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> front<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">[</span>i <span class="token operator">%</span> maxSize<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>sb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 队列中的有效数据个数
     *
     * <span class="token keyword">@return</span> 有效数据个数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>rear <span class="token operator">+</span> maxSize <span class="token operator">-</span> front<span class="token punctuation">)</span> <span class="token operator">%</span> maxSize<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4);function m(s,w){return t(),o("div",null,[c,a("img",{src:s.$withBase("/img/0055.png")},null,8,u),l,a("img",{src:s.$withBase("/img/0055.png")},null,8,k),i,a("img",{src:s.$withBase("/img/0055.png")},null,8,r),d])}const h=p(e,[["render",m],["__file","queue.html.vue"]]);export{h as default};
