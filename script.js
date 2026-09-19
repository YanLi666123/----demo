// ===== 1. 先找到页面上的元素 =====
// document.getElementById 通过 id 拿到 HTML 元素，相当于把页面和 JS 联系起来
const input = document.getElementById('todo-input');   // 输入框
const addBtn = document.getElementById('add-btn');     // 添加按钮
const list = document.getElementById('todo-list');     // 列表容器
const count = document.getElementById('todo-count');   // 统计文字

// ===== 2. 定义「添加待办」的函数 =====
function addTodo() {
  // 读取输入框的文字，并用 trim() 去掉首尾空格
  const text = input.value.trim();

  // 如果没输入内容（空字符串），直接结束函数，不做任何事
  if (text === '') {
    alert('请先输入内容');
    return;
  }

  // 创建一个新的 <li> 列表项
  const li = document.createElement('li');
  li.textContent = text;

  // 创建对应的「删除」按钮
  const delBtn = document.createElement('button');
  delBtn.textContent = '删除';

  // 给删除按钮绑定点击事件：点击时把这个 li 从列表里移除
  delBtn.addEventListener('click', function () {
    li.remove();
    updateCount();              // 删除后重新统计
  });

  // 把删除按钮放进 li 里，再把 li 放进列表里（放到最后）
  li.appendChild(delBtn);
  list.appendChild(li);

  // 点击文字本身 → 切换 done 状态（完成/未完成，用于打勾效果）
  li.addEventListener('click', function () {
    li.classList.toggle('done');
    updateCount();              // 切换后也要重新统计
  });

  // 添加完成后，清空输入框，并把光标重新放回输入框，方便连续输入
  input.value = '';
  input.focus();

  updateCount();                // 重新统计
}

// ===== 3. 更新底部统计数字 =====
// 用 CSS 类来选中完成项：document.querySelectorAll 按选择器找元素，返回一个列表（.length 是数量）
function updateCount() {
  const total = list.children.length;              // 所有 li 的数量
  const doneNum = list.querySelectorAll('li.done').length; // 完成的 li 的数量
  count.textContent = '共 ' + total + ' 项，已完成 ' + doneNum + ' 项';
}

// ===== 4. 绑定触发事件 =====
// 点击「添加」按钮 → 执行 addTodo
addBtn.addEventListener('click', addTodo);

// 在输入框里按回车 → 也执行 addTodo
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});
