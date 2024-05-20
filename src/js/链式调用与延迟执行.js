function arrange(name) {
  // code here

  const tasks = [];
  tasks.push(() => console.log(`${name} is notified`));

  async function execute(){
    for (const task of tasks) {
      await task();
    }
  }
  function doIt(tag) {
    tasks.push(() => console.log(`Start to ${tag}`));
    return this;
  }
  function wait(sec) {
    tasks.push(() =>
       new Promise((resolve, reject) => {
        setTimeout(resolve, sec * 1000);
      })
    );
    return this;
  }
  function waitFirst(sec) {
    tasks.unshift(() =>
       new Promise((resolve, reject) => {
        setTimeout(resolve, sec * 1000);
      })
    );
    return this;
  }

  return {
    do: doIt,
    execute,
    wait,
    waitFirst
  }


}

arrange("William").execute();
// > William is notified


arrange("William").do("commit").execute();
// > William is notified
// > Start to commit


arrange("William").wait(5).do("commit").execute();
// // > William is notified
// // > wait 5s
// // > Start to commit


arrange("William").waitFirst(5).do("commit").execute();
// // > wait 5s
// // > William is notified
// // > Start to commit
