往数组中添加对象,需要使用concat还是push,为什么?

选择使用 `concat()` 还是 `push()` 往数组中添加对象取决于你的具体需求：

### 使用 `push()` 的情况：

1. **修改原数组**：当你希望直接在原数组上添加对象，修改现有数组时，应该使用 `push()`。它会在数组的末尾添加一个或多个元素，并返回修改后数组的新长度。
2. **性能考虑**：如果你只添加单个对象，并且不关心返回新数组，使用 `push()` 可能更高效，因为它直接操作原数组，避免了创建新数组的开销。

### 使用 `concat()` 的情况：

1. **保持原数组不变**：如果你需要保留原数组不变，并得到一个包含新对象的新数组，应使用 `concat()`。它会返回一个新的数组，这个新数组包含了原数组的所有元素以及新添加的对象。
2. **合并多个数组或值**：当你需要合并多个数组或非数组值到一个新数组时，`concat()` 更为合适，因为它可以接受多个参数，并将它们全部合并到新数组中。

### 总结：

- 如果你希望操作简单，直接修改现有数组，并且不需要原数组保持不变，使用 `push()`。
- 如果你需要保持原数组不变，或者需要合并多个数组或值，应该选择 `concat()`。

在大多数日常开发场景中，如果只是简单地向数组中添加一个对象，使用 `push()` 可能更常见，因为它直接且高效。但如果你的代码逻辑要求不可变数据结构或者需要更多的灵活性（比如合并操作），则 `concat()` 是更好的选择。