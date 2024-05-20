class ListNode{
  val = null;
  next = null;
  constructor(val) {
    this.val = val;
  }
}



class hasCycle {
   static affirm (head) {
    if (head === null || head.next === null) return false;
    const array = [];
    array.push(head);
    while (true) {
      if (head.next === null) { // 一个节点或结尾了
        console.log("end")
        return false;
      }
      if (array.includes(head.next)) { // 在数组里则 找到环
        console.log("环");
        return true;
      } else { // 下一个不在数组里 将下一个放进去
        array.push(head.next);
        head = head.next;
      }
    }
  };
}

export {ListNode, hasCycle}
