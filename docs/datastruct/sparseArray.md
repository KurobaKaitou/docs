# 稀疏数组和队列

## 稀疏数组 (Sparse Array) 数组

> 假设我们有一个需求，在一盘五子棋游戏中有蓝子和黑子。而在一般的棋盘游戏中都有**存盘**退出和**续上盘**功能。

<img :src="$withBase('/img/0053.png')">

> 如上图，我们可以用数字0表示棋盘上没有子，1代表黑子，2代表蓝。而此时，在此棋盘中的很多值都是0，因此记录了许多**没有意义的数据**。所以产生了**稀疏数组**。



### 稀疏数组基本介绍

> 当一个数组中大部分元素为同一个值时，可以用稀疏数组来保存该数组。



### 稀疏数组基本作用

-   记录数组一共有几行几列，有多少个不同的值。
-   把具有不同值的元素行列及值记录在一个小规模的数组中，从而缩小程序的规模。



### 稀疏数组转换流程

<img :src="$withBase('/img/0054.png')">



### 稀疏数组代码实现



```java
package club.zhilin.structure.array;

import java.util.Arrays;

/**
 * @author zhilin
 * @since 2022/3/8 18:51
 */
@SuppressWarnings("all")
public class SparseArray {
    public static void main(String[] args) {
        // 创建一个原始的二维数组 11 * 11
        int[][] chessArr = new int[11][11];
        // 0表示没有子，1表示黑子，2表示蓝子
        chessArr[1][2] = 1;
        chessArr[2][3] = 2;
        // 将原始二维数组转换为稀疏数组
        int[][] sparseArray = toSparseArray(chessArr);
        // 打印
        for (int[] row : sparseArray) {
            System.out.println(Arrays.toString(row));
        }
        System.out.println("--------------分割线--------------");
        // 将稀疏数组转换为原始二维数组
        int[][] original = toOriginalArray(sparseArray);
        // 打印
        for (int[] row : original) {
            System.out.println(Arrays.toString(row));
        }
    }

    /**
     * 将原始二维数组转换为稀疏数组
     *
     * @param orginalArray 原始二维数组
     * @return 转换后的稀疏数组
     */
    public static int[][] toSparseArray(int[][] orginalArray) {
        if (orginalArray == null || orginalArray.length == 0) {
            throw new IllegalArgumentException("参数异常");
        }
        // 先遍历二维数组，得到非0数据的个数
        int sum = 0;
        for (int[] row : orginalArray) {
            for (int column : row) {
                if (column != 0) {
                    sum++;
                }
            }
        }
        // 创建有效数据 + 1 行 3 列的稀疏数组
        int[][] sparseArray = new int[sum + 1][3];
        // 给稀疏数组的第一行赋值
        // 稀疏数组的第 0 行第 0 列为数组的行长
        sparseArray[0][0] = orginalArray.length;
        // 稀疏数组的第 0 行第 1 列为数组的列长
        sparseArray[0][1] = orginalArray[0].length;
        // 稀疏数组的第 0 行第 2 列为有效数据个数
        sparseArray[0][2] = sum;
        // 遍历原始二维数组
        int count = 0;
        for (int i = 0; i < orginalArray.length; i++) {
            for (int j = 0; j < orginalArray[i].length; j++) {
                if (orginalArray[i][j] != 0) {
                    count++;
                    sparseArray[count][0] = i;
                    sparseArray[count][1] = j;
                    sparseArray[count][2] = orginalArray[i][j];
                }
            }
        }
        return sparseArray;
    }

    /**
     * 稀疏数组转换为原始二维数组
     *
     * @param sparseArray 稀疏数组
     * @return 恢复后的原始二维数组
     */
    public static int[][] toOriginalArray(int[][] sparseArray) {
        if (sparseArray == null || sparseArray.length == 0) {
            throw new IllegalArgumentException("参数异常");
        }
        // 先读取稀疏数组的第一行,根据第一行的数据,创建原始二维数组
        int[][] originalArray = new int[sparseArray[0][0]][sparseArray[0][1]];
        // 再进行读取稀疏数组的后几行数据并分别赋值给原始二维数组
        for (int i = 1; i < sparseArray.length; i++) {
            originalArray[sparseArray[i][0]][sparseArray[i][1]] = sparseArray[i][2];
        }
        return originalArray;
    }
}

```



## 队列 (Queue)

> 队列就类似于我们日常生活中，去银行排队取钱的场景。来得早的人总是先排队，后来的人则需要排到队伍后面等待前面的人被服务完，这便是**先进先出原则**。



### 队列介绍

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

