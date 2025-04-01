---
sidebar: auto
---
# 高频面试题
## SpringCloud常用组件有哪些？
最常用的5个组件是<font color="red"><strong>Nacos、Gateway网关、Feign远程调用、Sentinel熔断降级和Ribbon负载均衡</strong></font><p>其中Nacos是eureka的升级版，是阿里巴巴开发的，不仅仅可以作为注册中心，还可以作为配置中心</p>

### 注册中心
服务提供者在启动时，会将自己的元数据信息注册到Nacos服务器中，同时Nacos也会对注册的服务进行心跳检测，以确保服务的可用性，服务消费者在需要调用服务时，可以通过Nacos的服务发现功能获取服务提供者的地址列表，从而实现负载均衡和服务调用

### 配置中心
配置中心则是负责管理应用程序的配置信息，nacos提供了一个可视化的配置管理界面，支持多种格式的配置文件，支持动态配置管理，当配置信息发生变化时，Nacos会自动推送最新的配置信息给应用程序，从而实现配置的实时更新

### 网关Gateway
用于实现服务的路由、负载均衡、过滤和熔断等功能。采用了<font color="red">异步非阻塞</font>的模型，采用<font color="red">Netty</font>作为底层的HTTP库，提高了网关的吞吐量和性能。
<p>网关中的过滤器：</p>
<ol>
<li>默认过滤器(只能使用SpringCloudGateway自带的过滤器)</li>
<li>路由过滤器(只能使用SpringCloudGateway自带的过滤器)</li>
<li>全局过滤器(创建一个类实现GlobalFilter接口,重写filter方法.可用于鉴权)</li>
<li>三种过滤器默认执行顺序<font color="red">(默认 -> 路由 -> 全局)</font>全局过滤器实现<font color="red">Ordered</font>接口,重写</li>
</ol>
getOrder方法,返回-1即可实现在其他两个过滤器前执行(默认 和 路由 过滤器的Order默认是1开始的)

### Feign远程调用
<ol>
<li>定义接口：在Feign客户端的接口中定义需要调用的远程服务的方法，使用注解指定服务名称、请求方式、请求路径、请求参数，响应结果等信息。</li>
<li>解析接口：在应用启动时，Feign会扫描所有带有@FeignClient注解的接口，并将其解析成可执行的HTTP请求，生成动态代理对象并保存在Spring的容器中。</li>
<li>发起请求：当应用调用Feign客户端的接口方法时，Feign中依赖的ribbon组件会去获取@FeignClient注解中name属性的值，即服务名，通过这个服务名去找注册中心拉取服务提供者列表，缓存到本地。基于负载均衡的方式选择一个服务提供者，根据接口声明的方法上的请求路径，请求参数，请求方法，发送http请求</li>
<li>响应结果：远程服务接收到请求后，会根据请求路径和请求参数执行相应的逻辑，并将结果封装成HTTP响应返回。Feign客户端接收到响应后，根据响应结果类型进行反序列化，并返回给应用程序。以接口和注解的方式，实现对HTTP请求的映射和调用</li>
</ol>
底层原理：
<p>
Feign的底层实现基于<font color="red">动态代理</font>和<font color="red">HTTP客户端</font>，它将接口与HTTP请求/响应绑定在一起，通过注解配置的方式简化了服务调用的过程，提高了代码的可读性和可维护性。
</p>

### Sentinel熔断降级
<p>
Sentinel是一款开源的服务治理组件，主要提供流量控制、熔断降级和系统负载保护等功能。熔断降级是指在分布式系统中，即当系统出现异常或不可用时，通过断路器的方式将请求快速失败，避免请求不断堆积，引起系统的崩溃（雪崩）。Sentinel在防止微服雪崩上有以下4种方案:
</p>
<ol>
<li>超时处理：设定超时时间，请求超过一定时间没有响应就返回错误信息，不会无休止等待</li>
<li>舱壁模式：限定每个业务能使用的线程数，避免耗尽整个tomcat的资源，因此也叫线程隔离</li>
<li>熔断降级：由断路器统计业务执行的异常比例，如果超出阈值则会熔断该业务，拦截访问该业务的一切请求</li>
<li>流量控制：限制业务访问的QPS，避免服务因流量的突增而故障</li>
</ol>

### Ribbon负载均衡
<p>
主要作用是在服务消费者与服务提供者之间进行负载均衡，将请求分发到不同的服务实例上，从而提高系统的可用性和性能。Ribbon通过向注册中心获取服务实例信息，并通过算法选择合适的实例进行请求转发，从而实现负载均衡。可以通过配置不同的负载均衡策略，实现不同的负载均衡方式，如轮询、随机、加权随机、最少活跃数
</p>

## Spring Bean的生命周期
<p>
bean的生命周期是指：Spring 容器在管理 Bean 时，会根据特定的顺序进行初始化、依赖注入、执行业务逻辑等一系列操作，最终销毁 Bean；
</p>
<ol>
<li>实例化：Spring容器通过<font color="red">反射或工厂方法</font>创建bean的实例。</li>
<li>属性注入：Spring容器将bean的<font color="red">属性值</font>和<font color="red">依赖项</font>注入到实例中。</li>
<li>初始化：如果bean实现了InitializingBean接口，Spring容器将调用afterPropertiesSet()方法；如果在bean配置中声明了init-method属性，则Spring容器将调用指定的方法。（此时就可以使用bean了）</li>
<li>销毁：如果bean实现了DisposableBean接口，Spring容器将在关闭应用程序上下文时调用destroy()方法；如果在bean配置中声明了destroy-method属性，则Spring容器将调用指定的方法。</li>
</ol>
<p>
【注意】：
</p>
<p>	单例bean，只有一个实例会在应用程序上下文中存在，并且在容器关闭时销毁；</p>
<p> 对于原型bean，每次调用getBean()方法时都会创建一个新实例，因此不会进行销毁。</p>

## SpringMVC 执行流程
<p> SpringBoot==> web起步依赖(SpringMVC)  SpringMVC Spring MyBatis/MyBatisPlus  </p>
<p> SpringMVC请求原理很简单：说白了就是用一个DispatcherServlet 封装了一个Servlet(web组件)的调度中心， 由调度中心帮我们调用我们的处理方法：在这个过程中调度中心委托给各个组件执行具体工作 ，比如帮我们映射方法请求、帮我解析参数、调用处理方法、响应数据和页面 等。  </p>
<p>localhost:8092/coupons/1/issue</p>
<p>/coupons/1/issue==处理器映射器==>找到对应的Handler(还不是直接的Controller)==适配器==>转换成了Haddler(我们写的Controller)</p>
<img :src="$withBase('/img/0059.png')">
<p>
mvc的执行流程大致分为11步：
<ol>
<li>用户发送出请求到前端控制器DispatcherServlet。</li>
<li>DispatcherServlet收到请求调用HandlerMapping（处理器映射器）。</li>
<li>HandlerMapping找到具体的处理器(可查找xml配置或注解配置)，生成处理器对象及处理器拦截器(如果有)，再一起返回给DispatcherServlet。</li>
<li>DispatcherServlet调用HandlerAdapter（处理器适配器）。</li>
<li>HandlerAdapter经过适配调用具体的处理器（Handler/Controller）。</li>
<li>Controller执行完成返回ModelAndView对象。</li>
<li>HandlerAdapter将Controller执行结果ModelAndView返回给DispatcherServlet。</li>
<li>DispatcherServlet将ModelAndView传给ViewReslover（视图解析器）。</li>
<li>ViewReslover解析后返回具体View（视图）。</li>
<li>DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）。</li>
<li>DispatcherServlet响应用户。</li>
</ol>
</p>

## Spring Boot自动装配原理
<ol>
<li>启动类上@SpringBootApplication注解</li>
<li>底层用了3个核心注解，@SpringBootConfiguration声明当前类是一个配置类，@ComponentScan默认扫描启动类所在的包及其子包，@EnableAutoConfiguration开启自动配置。</li>
<li>@EnableAutoConfiguration底层封装了@Import注解，指定了一个ImportSelector接口的实现类，低版本调用selectImports()，高版本调用getAutoConfigurationEntry(),读取当前项目下所有依赖jar包中META-INF/spring.factories、META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports两个文件里面定义的配置类</li>
<li>在配置类中定义一个@Bean标识的方法，还定义了@Conditional开头的注解，条件如果满足，Spring会自动调用配置类中@Bean标识的方法，并把方法的返回值注册到IOC容器中</li>
</ol>

## Sql优化（索引类型、失效场景、执行计划）b+tree底层

### sql优化的方法有