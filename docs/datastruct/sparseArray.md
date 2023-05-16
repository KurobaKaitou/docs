# 稀疏数组

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