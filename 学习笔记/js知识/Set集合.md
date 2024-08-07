> set集合有什么用法?

JavaScript中的`Set`集合是一种特殊的类数组对象，用于存储唯一值。它的主要用途和用法包括但不限于以下几点：

1. **去重**：由于`Set`中的元素必须唯一，你可以轻松地通过将一个数组转换为`Set`来去除其中的重复项。

```javascript
   const array = [1, 2, 2, 3, 4, 4, 5];
   const uniqueArray = [...new Set(array)];
```

1. **成员检查**：使用`has()`方法快速检查一个值是否存在于集合中。

```js
javascript   const set = new Set([1, 2, 3]);
   console.log(set.has(2)); // 输出: true
```

1. **添加元素**：使用`add()`方法向集合中添加元素。如果尝试添加的元素已经存在，则不会有任何变化。

```js
javascript   const set = new Set();
   set.add(1);
   set.add(2);
```

1. **删除元素**：使用`delete()`方法从集合中移除一个元素。

```js
javascript   const set = new Set([1, 2, 3]);
   set.delete(2);
```

1. **清空集合**：使用`clear()`方法清空集合中的所有元素。

```js
javascript   const set = new Set([1, 2, 3]);
   set.clear();
```

1. **迭代**：`Set`是可迭代的，可以直接用于循环遍历，或者通过扩展运算符转换为数组。

```js
javascript   const set = new Set(['apple', 'banana', 'cherry']);
   for(let item of set) {
       console.log(item);
   }
```

1. **集合运算**：与其他集合进行交集、并集、差集等运算，这通常需要结合扩展运算符或`Array.from()`等方法来实现。
2. **作为函数参数的唯一性保障**：在某些场景下，你可能希望函数的某些参数只接受唯一的值，这时可以先将参数转换为`Set`再进行后续处理。

`Set`集合因其能够高效地处理唯一性问题，在处理数据去重、集合运算等场景下非常有用。



> 在js中数组和集合的区别有哪些?

在JavaScript中，数组（Array）和集合（Set）有明显的区别，尽管它们都可以用来存储多个值。以下是两者的主要差异：

### 数组 (Array)

- **数据类型**：数组可以存储任意类型的值，包括数字、字符串、对象、函数等。
- **有序**：数组中的元素是有顺序的，每个元素都有一个整数索引，从0开始。
- **可重复**：数组中的元素可以重复。
- **可变大小**：数组的大小是动态的，你可以随时添加或删除元素。
- **方法**：数组提供了一系列的方法，如 `push`, `pop`, `shift`, `unshift`, `splice`, `map`, `filter`, `reduce` 等，用于操作和遍历数组。
- **原型链**：数组继承自 `Array.prototype`，这意味着你可以扩展数组的原型以添加自定义方法。

### 集合 (Set)

- **数据类型**：集合中的元素可以是任意类型，但是不能是原始值的等价副本（例如，两个相等的数字或字符串会被视为同一个元素）。
- **无序**：集合中的元素是没有固定顺序的，尽管ES6之后的Set在迭代时会按照元素插入的顺序返回。
- **不可重复**：集合中的元素是唯一的，你不能向集合中添加相同的元素两次。
- **可变大小**：集合的大小也是动态的，可以添加或删除元素。
- **方法**：集合提供了一些特定的方法，如 `add`, `delete`, `has`, 和 `clear`，用于管理集合中的元素。
- **迭代器协议**：集合实现了迭代器协议，可以使用 `for...of` 循环或展开运算符进行迭代。

### 示例

```javascript
// 数组示例
let arr = [1, 2, 3, 2];
console.log(arr); // 输出 [1, 2, 3, 2]

// 集合示例
let set = new Set([1, 2, 3, 2]);
console.log(set); // 输出 Set { 1, 2, 3 }
```

### 总结

数组和集合在JavaScript中都提供了存储和操作数据的能力，但是它们的特性和使用场景有所不同。数组更适合需要保持元素顺序和可能包含重复元素的场景，而集合则适用于需要确保元素唯一性和快速查找的场景。