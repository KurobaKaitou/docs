# 队列

> 队列就类似于我们日常生活中，去银行排队取钱的场景。来得早的人总是先排队，后来的人则需要排到队伍后面等待前面的人被服务完，这便是**先进先出原则**。



### 队列(Queue)介绍

-   队列是一个有序列表，可以用**数组**或**链表**来实现。
-   遵循**先入先出**的原则。

<img :src="$withBase('/img/0055.png')">

> 上图就是利用数组模拟队列的示意图



### 数组模拟队列思路

-   队列本身是有序列表，若使用数组的结构来存储队列的数据，则队列数组的声明如下图，其中maxSize是该队列的最大容量。
-   因为队列的输出、输入是分别从前后端来处理，因此需要两个变量**front**以及**rear**分别**记录队列前后端的下标**，front会随着数据输出而改变，而rear则是随着数据输入而改变。

<img :src="$withBase('/img/0055.png')">

-   当我们将数据存入队列时称为 "add", add的处理需要有两个步骤
    -   将尾指针 rear 往后移：rear + 1,当front  == rear时，队列为空
    -   若尾指针rear小于队列的最大下标maxSize - 1时则将数据存入rear所指的数组元素中，否则队列为满无法存入数据。



### 数组模拟队列代码实现



```java
package club.zhilin.structure.queue;

/**
 * @author zhilin
 * @since 2022/3/9 13:35
 */
public class ArrayQueue {
    /**
     * 表示队列的最大容量
     */
    private final int maxSize;
    /**
     * 指向队列头
     */
    private int front;
    /**
     * 指向队列尾
     */
    private int rear;
    /**
     * 队列中的数据
     */
    private final int[] data;

    /**
     * 初始化队列
     *
     * @param maxSize 队列的最大容量
     */
    public ArrayQueue(int maxSize) {
        this.maxSize = maxSize;
        data = new int[maxSize];
        front = -1;
        rear = -1;
    }

    /**
     * 判断队列是否已满
     *
     * @return boolean
     */
    public boolean isFull() {
        return this.rear == this.maxSize - 1;
    }

    /**
     * 判断队列是否为空
     *
     * @return boolean
     */
    public boolean isEmpty() {
        return this.rear == this.front;
    }

    /**
     * 添加数据到队列中
     *
     * @param val 需要添加的值
     */
    public void add(int val) {
        // 判断队列是否为满
        if (this.isFull()) {
            throw new IllegalArgumentException("队列已满");
        }
        this.data[++rear] = val;
    }

    /**
     * 从队列中取出一个数据
     *
     * @return 数据
     */
    public int pop() {
        // 判断队列是否为空
        if (this.isEmpty()) {
            throw new IllegalArgumentException("队列为空");
        }
        return this.data[++front];
    }

    /**
     * 显示队列头部数据
     *
     * @return int
     */
    public int peak() {
        return this.data[front + 1];
    }

    /**
     * 展示队列中所有数据
     */
    public void list() {
        if (this.isEmpty()) {
            throw new IllegalArgumentException("队列为空,没有数据");
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = this.front + 1; i < this.data.length; i++) {
            if (i != this.front + 1) {
                sb.append(",");
            }
            sb.append(this.data[i]);
        }
        sb.append("]");
        System.out.println(sb);
    }
}

```

> 📌需要注意的是以上是一个一次性队列，当数据存满之后即使把数据全部取出来也不能再次添加数据。





### 数组模拟环形队列

> 环形队列是对前面的数组模拟队列的优化，充分利用数组。利用取模实现，将数组形成一个环形。



### 数组模拟环形队列思路

<img :src="$withBase('/img/0055.png')">

-   front变量的含义做出调整：front就指向队列的第一个元素，也就是说arr\[front] 就是队列的第一个元素，front 的初始值为0
-   rear变量的含义也做出调整：rear指向队列的最后一个元素的后一个位置。因为希望空出一个空间作为约定，rear的初始值为0
-   队列满条件调整为 (rear + 1) % maxSize == front&#x20;
-   队列空的条件不变
-   当我们这样分析，队列中有效的数据个数为 ( rear + maxSize - front ) % maxSize&#x20;



### 数组模拟环形队列代码实现

&#x20;

```java
package club.zhilin.structure.queue;

/**
 * @author zhilin
 * @since 2022/3/9 16:08
 */
public class CircleArrayQueue {
    /**
     * 表示队列的最大容量
     */
    private final int maxSize;
    /**
     * 指向队列头
     */
    private int front;
    /**
     * 指向队列尾
     */
    private int rear;
    /**
     * 队列中的数据
     */
    private final int[] data;

    /**
     * 初始化 maxSize 时总是比用户输入的数值 + 1,实际上是为了用户体验，能够保证队列可以容纳用户输入的最大容量个数据
     * 初始化环形队列，此处不在初始化 front 和 rear 因为 int 默认值为0
     * @param maxSize 队列最大容量
     */
    public CircleArrayQueue(int maxSize) {
        this.maxSize = maxSize + 1;
        this.data = new int[this.maxSize];
    }

    /**
     * 判断环形队列是否已满
     *
     * @return boolean
     */
    public boolean isFull() {
        return (this.rear + 1) % maxSize == front;
    }

    /**
     * 判断环形队列是否为空
     *
     * @return boolean
     */
    public boolean isEmpty() {
        return this.rear == this.front;
    }

    /**
     * 添加数据到队列
     *
     * @param val 数据
     */
    public void add(int val) {
        // 判断队列是否为满
        if (this.isFull()) {
            throw new IllegalArgumentException("队列已满");
        }
        // 直接添加数据并将 rear 指针后移
        this.data[rear] = val;
        rear = (rear + 1) % maxSize;
    }

    /**
     * 从队列顶部取出一个数据
     *
     * @return 从队列中取出的数据
     */
    public int pop() {
        if (this.isEmpty()) {
            throw new IllegalArgumentException("队列为空");
        }
        int value = this.data[front];
        front = (front + 1) % maxSize;
        return value;
    }

    /**
     * 打印队列
     */
    public void list() {
        if (this.isEmpty()) {
            throw new IllegalArgumentException("队列为空,没有数据");
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = front; i < front + size(); i++) {
            if (i != front) {
                sb.append(",");
            }
            sb.append(this.data[i % maxSize]);
        }
        sb.append("]");
        System.out.println(sb);
    }

    /**
     * 队列中的有效数据个数
     *
     * @return 有效数据个数
     */
    public int size() {
        return (rear + maxSize - front) % maxSize;
    }
}
```