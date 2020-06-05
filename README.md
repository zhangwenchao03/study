# 需要看的内容
网站 [Stack Overflow](https://stackoverflow.com/)
 MVC
[quartz](https://www.w3cschool.cn/quartz_doc/quartz_doc-2put2clm.html) 
 
# 文档集合
## [JavaScript](https://github.com/ArcherGrey/study/tree/master/JavaScript)
## [C#](https://github.com/ArcherGrey/study/tree/master/ASP.NET)


# 需要学习的知识点

## c++
书籍：

- effective C++
- C++ primer
- 深入了解c++面向对象模型

## 数据结构

## opengl

## opencv

## 算法
> 本文主要是记录一些Git的配置和命令。

### 安装Git

1. \\10.3.2.11\dti\FileServer\WangYuchao_WH\Git-2.24.1.2-64-bit.exe

### 基本使用

#### 1. 配置用户信息

第一次打开Git时,首先要在Git上设置username和email；

```
$ git config --global user.name "yuchao.wang_U+" #与注册的账号邮箱一致；
$ git config --global user.email "yuchao.wang@united-imaging.com"
```

#### 2. 获取与提交代码
获取远程仓库代码

```
$ git clone <git registry path>
```

获得最新的代码：

```
$ git pull origin
```

获得指定版本的源码

```
$ git checkout <branch_name>
```

修改文件后提交到本地仓库

```
$ git add –A # 添加修改文件到临时空间
$ git commit -m “blog, git use” # 添加本地仓库和添加备注
$ git tag v2 # 打标签
```

将本地仓库的提交推送到远程仓库

```
$ git push origin master # 上传到服务器的master
$ git push origin --tags # 上传标签到服务器
```

#### 3. 使用分支
查看所有分支

```
$ git branch --all # 本地主分支：master；远程主分支origin/master
```

创建本地分支

```
$ git branch bak # 创建本地分支
$ git branch # 查看本分支；"*"号表示当前所在分支
```

发布新分支

将本地新建的bak分支同步到远程服务器

```
$ git push origin bak # 这样远程仓库也有一个bak分支了
$ git checkout bak # 切换到bak分支操作
```

第一种情况：bak分支开发完成，合并到主分支：

```
$ git checkout master # 切换到主分支
$ git merge bak # 把bak分支的更改和master合并
$ git push # 提交主分支代码远程
$ git checkout bak # 切换到bak远程分支
$ git push # 提交bak分支到远程
```

第二种情况：bak分支没开发完，推送保存，下次再开发：

```
$ git add -A # 添加修改文件到临时空间
$ git commit -m "bak branch" # 提交本地bak分支仓库
$ git push # 提交bak分支到远程
```

删除分支

```
$ git checkout master  #切换到master分支
$ git branch -D bak # 用branch -D 删除目标分支
$ git branch # #查看删除后的本地分支
```

删除远程bak分支，:bell:危险

```
git push origin :bak
```

#### 4. 使用草稿箱

```
$ git stash save "save message"  # 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。
$ git stash list  # 查看stash了哪些存储
$ git stash show # 显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}
$ git stash show -p # 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p
$ git stash apply # 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 
$ git stash pop # 命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}
$ git stash drop stash@{$num} # 丢弃stash@{$num}存储，从列表中删除这个存储
$ git stash clear ：删除所有缓存的stash
```

:bell: 注意事项
- 新增的文件，直接执行stash是不会被存储的

- git add 只是把文件加到git 版本控制里，并不等于就被stash起来了，git add和git stash 没有必然的关系，但是执行git stash 能正确存储的前提是文件必须在git 版本控制中才行。

#### 5. git cherry-pick的使用

> git cherry-pick可以理解为”挑拣”提交，它会获取某一个分支的单笔提交，并作为一个新的提交引入到你当前分支上。 当我们需要在本地合入其他分支的提交时，如果我们不想对整个分支进行合并，而是只想将某一次提交合入到本地当前分支上，那么就要使用git cherry-pick了。

```
$ git cherry-pick [<options>] <commit-ish>...
常用options:
    --quit                退出当前的chery-pick序列
    --continue            继续当前的chery-pick序列
    --abort               取消当前的chery-pick序列，恢复当前分支
    -n, --no-commit       不自动提交
    -e, --edit            编辑提交信息
```

- git cherry-pick commitid

在本地仓库中，有两个分支:branch1和branch2，我们先来查看各个分支的提交：

```
# 切换到branch2分支
$ git checkout branch2
Switched to branch 'branch2'
$ 
$ 
# 查看最近三次提交
$ git log --oneline -3
23d9422 [Description]:branch2 commit 3
2555c6e [Description]:branch2 commit 2
b82ba0f [Description]:branch2 commit 1
# 切换到branch1分支
$ git checkout branch1
Switched to branch 'branch1'
# 查看最近三次提交
$ git log --oneline -3
20fe2f9 commit second
c51adbe commit first
ae2bd14 commit 3th
```

- 现在，我想要将branch2分支上的第一次提交内容合入到branch1分支上，则可以使用git cherry-pick命令：

```
$ git cherry-pick 2555c6e
error: could not apply 2555c6e... [Description]:branch2 commit 2
hint: after resolving the conflicts, mark the corrected paths
hint: with 'git add <paths>' or 'git rm <paths>'
hint: and commit the result with 'git commit'
```

- 当cherry-pick时，没有成功自动提交，这说明存在冲突，因此首先需要解决冲突,解决冲突后需要git commit手动进行提交：

```
$ git commit 
[branch1 790f431] [Description]:branch2 commit 2
 Date: Fri Jul 13 18:36:44 2018 +0800
 1 file changed, 1 insertion(+)
 create mode 100644 only-for-branch2.txt
```

- 或者git add .后直接使用git cherry-pick --continue继续。
- 现在查看提交信息：

```
$ git log --oneline -3
790f431 [Description]:branch2 commit 2
20fe2f9 commit second
c51adbe commit first
```

- branch2分支上的第二次提交成功合入到了branch1分支上。
- 以上就是git cherry-pick的基本用法，如果没有出现冲突，该命令将自动提交。

- git cherry-pick -n

如果不想git cherry-pick自动进行提交，则加参数-n即可。比如将branch2分支上的第三次提交内容合入到branch1分支上：

```
$ git cherry-pick 23d9422
[branch1 2c67715] [Description]:branch2 commit 3
 Date: Fri Jul 13 18:37:05 2018 +0800
 1 file changed, 1 insertion(+)
```
查看提交log,它自动合入了branch1分支：

```
$ git log --oneline -3
2c67715 [Description]:branch2 commit 3
f8bc5db [Description]:branch2 commit 2
20fe2f9 commit second
```

如果不想进行自动合入，则使用git cherry-pick -n：

```
# 回退上次提交，再此进行cherry-pick
$ git reset --hard HEAD~
HEAD is now at f8bc5db [Description]:branch2 commit 2
$ git cherry-pick -n 23d9422
$ git status
On branch branch1
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   only-for-branch2.txt
```

- 这时通过git status查看，发现已将branch2的提交获取但是没有合入。

- git cherry-pick -e

如果想要在cherr-pick后重新编辑提交信息，则使用git cherry-pick -e命令，比如我们还是要将branch2分支上的第三次提交内容合入到branch1分支上，但是需要修改提交信息：

```
$ git cherry-pick -e 23d9422

  1 [Description]:branch2 commit 3
  2 #
  3 # It looks like you may be committing a cherry-pick.
  4 # If this is not correct, please remove the file
  5 #       .git/CHERRY_PICK_HEAD
  6 # and try again.
```

- git cherry-pick –continue, –abort，–quit

当使用git cherry-pick发生冲突后,将会出现如下信息：

```
$ git cherry-pick 23d9422
error: could not apply 23d9422... [Description]:branch2 commit 3
hint: after resolving the conflicts, mark the corrected paths
hint: with 'git add <paths>' or 'git rm <paths>'
hint: and commit the result with 'git commit'
```

- 这时如果要继续cherry-pick，则首先需要解决冲突，通过git add .将文件标记为已解决，然后可以使用git cherry-pick --continue命令，继续进行cherry-pick操作。

- 如果要中断这次cherry-pick,则使用git cherry-pick --quit，这种情况下当前分支中未冲突的内容状态将为modified。

- 如果要取消这次cherry-pick,则使用git cherry-pick --abort，这种情况下当前分支恢复到cherry-pick前的状态，没有改变。

- git cherry-pick < branchname >

如果在git cherry-pick后加一个分支名，则表示将该分支顶端提交进cherry-pick，如：

```
$ git cherry-pick master
```

- git cherry-pick ..< branchname >
- git cherry-pick ^HEAD < branchname >

以上两个命令作用相同，表示应用所有提交引入的更改，这些提交是branchname的祖先但不是HEAD的祖先，比如，现在我的仓库中有三个分支，其提交历史如下图：

```
               C<---D<---E  branch2
              /
master   A<---B  
              \
               F<---G<---H  branch3
                         |
                         HEAD
```

如果我使用git cherry-pick ..branch2或者git cherry-pick ^HEAD branch2,那么会将属于branch2的祖先但不属于branch3的祖先的所有提交引入到当前分支branch3上，并生成新的提交，执行命令如下:

```
$ git cherry-pick ..branch2
[branch3 c95d8b0] [Description]:branch2  add only-for-branch2
 Date: Fri Jul 13 20:34:40 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 only-for-branch2
[branch3 7199a67] [Description]:branch2 modify for only-for-branch2--1
 Date: Fri Jul 13 20:38:35 2018 +0800
 1 file changed, 1 insertion(+)
[branch3 eb8ab62] [Description]:branch2 modify for only-for-branch2--2
 Date: Fri Jul 13 20:39:09 2018 +0800
 1 file changed, 1 insertion(+)
```

执行后的提交历史如下：

```

               C<---D<---E  branch2
              /
master   A<---B  
              \
               F<---G<---H<---C'<---D'<---E'  branch3
                                          |
                                         HEAD
```

- 常见问题

1.The previous cherry-pick is now empty, possibly due to conflict resolution.

在cherry-pick时出现冲突，解决冲突后本地分支中内容和cherry-pick之前相比没有改变，因此当在以后的步骤中继续git cherry-pick或执行其他命令时，由于此时还处于上次cherry-pick，都会提示该信息，表示可能是由于解决冲突造成上一次cherry-pick内容是空的。

- 解决方案

- 执行git cherry-pick --abort取消上次操作。
- 执行git commit --allow-empty,表示允许空提交。

2. fatal: You are in the middle of a cherry-pick – cannot amend.

在cherry-pick时出现冲突，没有解决冲突就执行git commit --amend命令，从而会提示该信息。

- 解决方案

首先在git commit --amend之前解决冲突，并完成这次cherry-pick:

```
$ git add .
$ git cherry-pick --continue
```


### 参考
#### 1. Git常用命令总结

```
$ git clone <git registry> # 拉取远程代码
$ git checkout -b <branchName> # 创建并切换本地分支
$ git add . #提交当前路径下所有的修改文件到暂存区
$ git commit -m “bak branch” # 提交本地bak分支仓库
$ git push origin <branchName> #创建远程分支并将本地分支提交
$ git pull origin <branchName> #获取远程分支最新代码
$ git branch -v #查看当前所有本地分支
$ git branch -a #查看远程所有分支
$ git checkout --track origin/<barnchName> #获取远程分支代码到本地并创建关联 使用git push \ git pull 直接操作远程分支。
$ git push --set-upstream origin <barnchName> #提交本地到远程并创建关联 
$ git merge bak # 把bak分支的更改和当前分支合并
$ git cherry-pick <git hashcode至少六位> #合并某个提交的版本
$ git status #查看仓库状态;
$ git diff XX #查看XX文件修改了那些内容;
$ git log #查看历史记录;
$ git reflog #查看历史记录(含回退纪录)；
$ git reset –hard HEAD^ #回退到上一个版本;
$ git reset –hard HEAD~ #回退到上一个版本;
$ git reset –hard HEAD~100 #回退到100个版本;
$ git reset -hard <git hashcode至少六位> #回退到这个hash code的版本
$ git reset HARD filename # 强制将某个提交文件移除暂存区
$ git checkout – XX #把XX文件在工作区的修改全部撤销；
$ git rm XX #删除XX文件跟踪；
```

#### 2. Git常用命令图解

![Git.png](/.attachments/Git-12e0e4dc-b225-4ce9-8e5f-c2d9a7160e16.png)

#### 3. GitFlow分支管理模式图解
Git在实际使用过程中，产生了好几种分支管理的模式，最常用的一种GitFlow，如下图：

![GitFlow.png](/.attachments/1-95b15eb6-508d-4bcb-af6f-2b82572ac1d8.png)

#面向对象的设计原则

> 口诀 为了便于记忆，我们可以使用一个口诀来记忆面向对象设计原则：开口合里最单依

````
开：开闭原则
口：接口隔离原则
合：组合/聚合原则
里：里式替换原则
最：最少知识原则（迪米特法则）
单：单一职责原则
依：依赖倒置原则
````

[参考资料函数组件和类组件的区别](https://reactjs.org/docs/components-and-props.html)

#### 开闭原则

在一个类中暴露出去的方法，若这个方法变更了，则会产生很大的后果，可能导致其他依赖于这个方法且有不需要变更的业务造成大面积瘫痪。为了解决这个问题，可以单独再写一个方法，若这个方法与这个类中的其他方法相互依赖。

解决办法：

- 把其中依赖的代码copy一份到新的类中。
- 在新类中引用旧类中的方法。

两种方法都不是最好的解决方案。

第一种方法会导致代码大量的重复，第二种方法会导致类与类之间互相依赖。

> 什么是开闭原则

开闭原则：“软件中的对象（类，模块，函数等等）应该对于扩展是开放的，但是对于修改是封闭的”，这意味着一个实体是允许在不改变它的源代码的前提下变更它的行为。(节选自百度百科)

开闭原则对扩展开放,对修改关闭,并不意味着不做任何修改,底层模块的变更,必然要有高层模块进行耦合,否则就是一个孤立无意义的代码片段。开闭原则是一个最基本的原则,另外六个原则都是开闭原则的具体形态,是指导设计的工具和方法,而开闭原则才是精神领袖。

> 开闭原则好处

1. 开闭原则有利于进行单元测试
1. 开闭原则可以提高复用性
1. 开闭原则可以提高可维护性
1. 面向对象开发的要求

> 实例

````
class Drag {
    down(){
        //  ...
    }
    move(){
        //  ...
        // 对拖拽没有做任何限制可以随意拖拽
    }
    up(){
        //  ...
    }
}
class LimitDrag extends Drag {
    move(){
        //  ...
        //  重写该方法对拖拽进行限制处理
    }
}
````

在LimitDrag中重写了move方法，若修改了可以满足两种需求，一种是限制型拖拽，一种是不限制型拖拽，任何一个更改了另外一个还是可以正常运行。

#### 接口隔离原则

> 什么是接口隔离

接口隔离：客户端不应该依赖它不需要的接口；一个类对另一个类的依赖应该建立在最小的接口上。(节选自百度百科)

接口隔离原则与单一职责原则的审视角度不相同。单一职责原则要求是类和接口的职责单一，注重的职责，这是业务逻辑上的划分。接口隔离原则要求接口的方法尽量少。

> 接口隔离好处

1. 避免接口污染
1. 提高灵活性
1. 提供定制服务
1. 实现高内聚

> 实例

````
function mix(...mixins) {
  class Mix {}
  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"&& key !== "prototype"&& key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
class Behavior {
    eat(){
        throw "Abstract methods cannot be used";
    }
    call(){
        throw "Abstract methods cannot be used";
    }
}
class Action {
    climbTree(){
        throw "Abstract methods cannot be used";
    }
}
class Dog extends Behavior{
    eat(food){
        console.log(`狗正在吃${food}`);
    }
    hungry(){
        console.log("汪汪汪,我饿了")
    }
}
const CatMin = mix(Behavior,Action);
class Cat extends CatMin{
    eat(food){
        console.log(`猫正在吃${food}`);
    }
    hungry(){
        console.log("喵喵喵,我饿了")
    }
    climbTree(){
        console.log("爬树很开心哦~")
    }
}
let dog = new Dog();
dog.eat("骨头");
dog.hungry();
let cat = new Cat();
cat.eat("鱼");
cat.hungry();
cat.climbTree();
````

大家一定要好好分析一下上面的代码，共有两个抽象类，分别对应不同的行为，Cat与Dog类拥有共同的行为，但是Cat又拥有其自己单独的行为，使用抽象(即接口)继承其方法，使用接口隔离使其完成各自的工作，各司其职。

#### 组合/聚合复用原则

聚合（Aggregation）表示一种弱的‘拥有’关系，体现的是A对象可以包含B对象但B对象不是A对象的一部分。

合成（Composition）则是一种强的'拥有'关系，体现了严格的部分和整体关系，部分和整体的生命周期一样。

组合/聚合：是通过获得其他对象的引用，在运行时刻动态定义的，也就是在一个对象中保存其他对象的属性，这种方式要求对象有良好定义的接口，并且这个接口也不经常发生改变，而且对象只能通过接口来访问，这样我们并不破坏封装性，所以只要类型一致，运行时还可以通过一个对象替换另外一个对象。

优先使用对象的合成/聚合将有助于你保持每个类被封装，并被集中在单个任务上，这样类和类继承层次会保持较小规模，而且不太可能增长为不可控制的庞然大物。

> 组合/聚合复用原则好处

1. 新的实现较为容易，因为超类的大部分功能可通过继承关系自动进入子类；
1. 修改或扩展继承而来的实现较为容易。

> 实例

````
function mix(...mixins) {
  class Mix {}
  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"&& key !== "prototype"&& key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
class Savings {
    saveMoney(){
        console.log("存钱");
    }
    withdrawMoney(){
        console.log("取钱");
    }
}
class Credit {
    overdraft(){
        console.log("透支")
    }
}
const CarMin = mix(Savings,Credit);
class UserCar extends CarMin {
    constructor(num,carUserName){
        super();
        console.log()
        this.carNum = num;
        this.carUserName = carUserName;
    }
    getCarNum(){
        return this.carNum;
    }
    getCarUserName(){
        return this.carUserName;
    }
}
let myCar = new UserCar(123456798,"Aaron");
console.log(myCar.getCarNum());
console.log(myCar.getCarUserName());
myCar.saveMoney();
myCar.withdrawMoney();
myCar.overdraft();
````

#### 里式替换原则

每个开发人员在使用别人的组件时，只需知道组件的对外裸露的接口，那就是它全部行为的集合，至于内部到底是怎么实现的，无法知道，也无须知道。所以，对于使用者而言，它只能通过接口实现自己的预期，如果组件接口提供的行为与使用者的预期不符，错误便产生了。里氏替换原则就是在设计时避免出现派生类与基类不一致的行为。

> 什么是里氏替换

里氏替换原则：OCP作为OO的高层原则，主张使用“抽象(Abstraction)”和“多态(Polymorphism)”将设计中的静态结构改为动态结构，维持设计的封闭性。“抽象”是语言提供的功能。“多态”由继承语义实现。(节选自百度百科)

> 里氏替换好处

1. 代码共享，减少创建类的工作量，每个子类都拥有父类的方法和属性
1. 提高代码的重用性
1. 子类可以形似父类，但是又异于父类。
1. 提高代码的可扩展性，实现父类的方法就可以了。许多开源框架的扩展接口都是通过继承父类来完成。
1. 提高产品或项目的开放性

> 实例

````
//  抽象枪类
class AbstractGun {
    shoot(){
        throw "Abstract methods cannot be called";
    }
}
//  步枪
class Rifle extends AbstractGun {
    shoot(){
        console.log("步枪射击...");
    }
}
//  狙击枪
class AUG extends Rifle {
    zoomOut(){
        console.log("通过放大镜观察");
    }
    shoot(){
        console.log("AUG射击...");
    }
}
//  士兵
class Soldier {
    constructor(){
        this.gun = null;
    }
    setGun(gun){
        this.gun = gun;
    }
    killEnemy(){
        if(!this.gun){
            throw "需要给我一把枪";
            return;
        }
        console.log("士兵开始射击...");
        this.gun.shoot();
    }
}
//  狙击手
class Snipper extends Soldier {
    killEnemy(aug){
        if(!this.gun){
            throw "需要给我一把枪";
            return;
        }
        this.gun.zoomOut();
        this.gun.shoot();
    }
}
let soldier = new Soldier();
soldier.setGun(new Rifle());
soldier.killEnemy();

let snipper = new Snipper();
//  分配狙击枪
snipper.setGun(new AUG());
snipper.killEnemy();

snipper.setGun(new Rifle());
// snipper.killEnemy();  //  this.gun.zoomOut is not a function
````

从上述代码中可以看出，子类和父类之间关系，子类方法一定是等于或大于父类的方法。子类能够出现的父类不一定能出现，但是父类出现的地方子类一定能够出现。

#### 最少知识原则（迪米特法则）

迪米特法则:最少知识原则（Least Knowledge Principle 简写LKP），就是说一个对象应当对其他对象有尽可能少的了解,不和陌生人说话。英文简写为: LoD.(节选自百度百科)

迪米特法则的做法观念就是类间解耦，弱耦合，只有弱耦合了以后，类的复用率才可以提高。一个类应该对其他对象保持最少的了解。通俗来讲，就是一个类对自己依赖的类知道的越少越好。因为类与类之间的关系越密切，耦合度越大，当一个类发生改变时，对另一个类的影响也越大。

> 迪米特法则好处

1. 减少对象之间的耦合性

> 实例

````
class ISystem {
    close(){
        throw "Abstract methods cannot be used";
    }
}
class System extends ISystem{
    saveCurrentTask(){
        console.log("saveCurrentTask")
    }
    closeService(){
        console.log("closeService")
    }
    closeScreen(){
        console.log("closeScreen")
    }
    closePower(){
        console.log("closePower")
    }
    close(){
        this.saveCurrentTask();
        this.closeService();
        this.closeScreen();
        this.closePower();
    }
}
class IContainer{
    sendCloseCommand(){
        throw "Abstract methods cannot be used";
    }
}
class Container extends IContainer{
    constructor(){
        super()
        this.system = new System();
    }
    sendCloseCommand(){
        this.system.close();
    }
}
class Person extends IContainer{
    constructor(){
        super();
        this.container = new Container();
    }
    clickCloseButton(){
       this.container.sendCloseCommand();
    }
}
let person = new Person();
person.clickCloseButton();
````

上面代码中Container作为媒介，其调用类不知道其内部是如何实现，用户去触发按钮，Container把消息通知给计算机，计算机去执行相对应的命令。

#### 单一职责原则

如果我们在编写程序的时候，一类或者一个方法里面包含了太多方法，对于代码的可读性来说，无非是一场灾难，对于我们来说。所以为了解决这个问题，出现了单一职责。

> 什么是单一职责

单一职责：又称单一功能原则，面向对象五个基本原则（SOLID）之一。它规定一个类应该只有一个发生变化的原因。(节选自百度百科)

按照上面说的，就是对一个类而言，应该仅有一个引起它变化的原因。换句话说，一个类的功能要单一，只做与它相关的事情。在类的设计过程中要按职责进行设计，彼此保持正交，互不干涉。

> 单一职责的好处

1. 类的复杂性降低，实现什么职责都有清晰明确的定义
1. 可读性提高，复杂性降低，那当然可读性提高了
1. 可维护性提高，可读性提高，那当然更容易维护了
1. 变更引起的风险降低，变更是必不可少的，如果接口的单一职责做得好，一个接口修改只对相应的实现类有影响，对其他的接口无影响，这对系统的扩展性、维护性都有非常大的帮助。

> 实例

````
class ShoppinCar {
    constructor(){
        this.goods = [];
    }
    addGoods(good){
        this.goods = [good];
    }
    getGoodsList(){
        return this.goods;
    }
}
class Settlement {
    constructor(){
        this.result = 0;
    }
    calculatePrice(list,key){
        let allPrice = 0;
        list.forEach((el) => {
            allPrice += el[key];
        })
        this.result = allPrice;
    }
    getAllPrice(){
        return this.result;
    }
}
````

用上面的代码来说ShoppinCar类存在两个方法addGoods和getGoodsList,分别是添加商品和获取商品列表。Settlement类中存在两个方法calculatePrice和getAllPrice分别做的事情是计算价钱与获取总价钱。ShoppinCar与Settlement都是在做自己的事情。添加商品与计算价格，虽然在业务上是相互依赖的，但是在代码中分别用两个类，然他们自己做自己的事情。其中任何一个类更改不会对另一个类进行更改。

#### 依赖倒置原则

如果方法与方法之间或类与类之间，存在太多的依赖关系会导致代码可读性以及可维护性很差。依赖倒置原则能够很好的解决这些问题。

> 什么是依赖倒置

依赖倒置原则：程序要依赖于抽象接口，不要依赖于具体实现。简单的说就是要求对抽象进行编程，不要对实现进行编程，这样就降低了客户与实现模块间的耦合。(节选自百度百科)

1. 高层模块不应该依赖低层模块，两者都应该依赖其抽象
1. 抽象不应该依赖细节
1. 细节应该依赖抽象

> 依赖倒置好处

1. 通过依赖于接口，隔离了具体实现类
1. 低一层的变动并不会导致高一层的变动
1. 提高了代码的容错性、扩展性和易于维护

> 实例

````
//  抽象枪类
class AbstractGun {
    shoot(){
        throw "Abstract methods cannot be called";
    }
}
//  步枪
class Rifle extends AbstractGun {
    shoot(){
        console.log("步枪射击...");
    }
}
//  狙击枪
class AUG extends AbstractGun {
    shoot(){
        console.log("AUG射击...");
    }
}
````

从上面的代码可以看出，步枪与狙击枪的shoot全部都是依赖于AbstractGun抽象的枪类，上述编程满足了依赖倒置原则。




### 1. JavaScript文件扩展名 .JS || .JSX

- 本质上没啥区别因为React默认就支持JSX。
- 借助相关babel presets 把jsx写法转化为React.createElement(.....)。
- 如果你用 eslint-config-airbnb,, 在js文件里使用jsx语法会报错。
- 建议全员直接用.JS为后缀，统一管理文件。

### 2. 组件设计思想及区分

本质上在src目录中创建的文件后缀都为.js文件， 但是根据具体业务场景的不同应该要合理组织这些.js文件，所以我们需要有以下概念。

- #### 容器组件（Container Component）
  - 关注应用的是如何工作的。
  - 内部可以包含容器组件和展示组件。
  - 提供数据和行为给其他的展示组件或容器组件。
  - 调用Flux操作并将它们作为回调函数提供给展示组件。
  - 往往是有状态的，因为它们倾向于作为数据源。

-  #### 展示组件（Presentational Component）
  - 关注页面的展示效果（外观）
  - 内部可以包含展示组件和容器组件，通常会包含一些自己的DOM标记和样式(style)
  - 通常允许通过this.props.children方式来包含其他组件。
  - 对应用程序的其他部分没有依赖关系，例如Flux操作或store。
  - 不用关心数据是怎么加载和变动的。
  - 只能通过props的方式接收数据和进行回调(callback)操作。
  - 很少拥有自己的状态，即使有也是用于展示UI状态的。
  - 会被写成函数式组件除非该组件需要自己的状态，生命周期或者做一些性能优化。

- #### 纯粹【Pure】

纯粹：输入什么就输出什么，不会再其中做相应的变动。可以被定义为类或函数，可以是无状态或有状态的，纯组件的另一个重要方面是它们不依赖props或state中的深度变动，所以他们的渲染性能可以通过在shouldComponentUpdate（）钩子中进行浅层比较来优化，当前只有类可以定义shouldComponentUpdate（）方法。

### 1 脚手架及打包工具使用umi

umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 600+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等。他已经很好地服务了我们的内部用户，同时希望他也能服务好外部用户。

#### 特性

开箱即用，
内置 react、react-router 等

🏈 类 next.js 且功能完备的路由约定，同时支持配置的路由方式

🎉 完善的插件体系，覆盖从源码到构建产物的每个生命周期

🚀 高性能，通过插件支持 PWA、以路由为单元的 code splitting 等

💈 支持静态页面导出，适配各种环境，比如中台业务、无线业务、eg
g、支付宝钱包、云凤蝶等

🚄 开发启动快，支持一键开启 dll 等

🐠 一键兼容到 IE9，基于 umi-plugin-polyfills

🍁 完善的 TypeScript 支持，包括 d.ts 定义和 umi test

🌴 与 dva 数据流的深入融合，支持 duck directory、model 的自动加载、code splitting 等等

[详细说明](https://umijs.org/)

### 2 dva

#### 介绍

dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

#### 特性

- 易学易用，仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
- elm 概念，通过 reducers, effects 和 subscriptions 组织 model
- 插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
- 支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR即模块热替换(hot module replacement)

[详细说明](https://dvajs.com/)


### 3 工程目录结构

````
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── theme                # 全局通用样式变量
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
````

### 4 前端开发IDE选择Visual Studio Code

Microsoft在2015年4月30日Build 开发者大会上正式宣布了 Visual Studio Code 项目：一个运行于 Mac OS X、Windows和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器。

- 推荐安装的插件

插件 | 说明
---|---
**ESLint** | 静态检查一定要装
**Trailing Spaces** | 多余空格提示
**Import Cost** | 引入包的大小
GitLens - Git supercharged | 用于知道提交者信息
file-size | 知道当前文件大小
Chinese (Simplified) Language Pack | 中文包
Bracket Pair Colorizer | 代码高亮美化
JavaScript (ES6) code snippets | ES6代码片段生成
Typescript React code snippets | TS代码片段生成
Reactjs code snippets | React代码片段生成
One Dark Pro | 编辑器美化

#发布一个React组件的方式
## 第一步 配置环境

1. 创建一个文件夹
2. 进入当前文件夹
3. 打开你的命令行
4. 输入以下命令

```
$ npm init -y
```

这里我们需要改动三个地方：

> package.json
```
"main": "dist/bundle.js",
"files": ["dist"],
"scripts": {
    "start": "webpack-dev-server --config webpack.dev.config.js",
    "dev": "webpack-dev-server --config webpack.dev.config.js",
    "build": "webpack --config webpack.prod.config.js"
  },
```

main: 这里是我们组件的入口文件。开发者在 import 我们的组件的时候会引入这里 export 的内容
files: 申明将要发布到 npm 的文件。如果省略掉这一项，所有文件包括源代码会被一起上传到 npm
scripts: 申明命令行可用的各种指令。

接下来安装依赖

```
$ npm i react react-dom
$ npm i -D  babel-loader @babel/core @babel/preset-env @babel/preset-react webpack webpack-dev-server webpack-cli html-webpack-plugin webpack-node-externals css-loader style-loader 
```

接下来配置 webpack。这里分成两份配置，一份用于开发环境(development)，一份用于单独打包组件用于生产环境(production)。

在开发环境下，我们需要搭建一个完整的项目，让我们可以开发组件，并可以将其引入其他组件，渲染到浏览器中看到效果。同时我们也需要一些开发工具的支持，比如 HMR（hot module reloa） 组件热更新和详细的报错信息。

在生产环境下，只需要打包组件本身，不包括工程里面的其他组件。同时我们需要压缩文件体积，尽量减小组件打包之后的体积。

## 第二步 配置Webpack

下面是我们的 webpack 开发配置

```
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.cm\.styl$/,
        loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
};
```

production 打包配置，区别是改变了 entry，因为我们只需要单独的组件，并且改变了 libraryTarget，这个配置项的默认参数是 'var'，我们需要改成 commonjs2，这样可以通过模块系统引入这个组件。另一点区别是使用了 nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用。

下面是我们的 webpack 发布配置

```
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/autosuggest.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.cm\.styl$/,
        loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
      }
    ]
  },
  externals: [nodeExternals()]
};
```

在 package.json 中，我们可以通过 --config 指定 webpack 使用哪一套配置。在这个 demo 里使用了 stylus 来写样式文档，所以添加了相应的 css pre-processor，把 stylus 语法 转化为 css 语法。并且在引入 css 的时候使用了模块化 css 以避免全局命名冲突。

## 第三步 配置 .babelrc

> .babelrc

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 第四步 开发组件

完成以上配置以后，我们可以在 src 文件夹里面开发自己组件。运行 npm run dev，让 webpack-dev-server 渲染到浏览器中，实时看到效果。

## 第五步 打包并验证

打包组件，只需要运行 npm run build 就可以了。
接下来可以通过 npm link 把打包之后的组件引入到 global node_modules 中，然后在验证 demo 中再通过 npm link react-tiny-autosuggest 引入这个组件，并验证是否符合预期。

// At development directory

```
$ npm run build
$ npm link

$ cd [test project folder]
$ npm link [current project name]
```

接下来 demo 里面就可以直接 import xxxxx from 'current project name'了。

## 第五步 发布到 NPM

发布组件到 npm: 

```
$ npm publish
```

取消发布: 
```
$ npm unpublish
```

## 第六步 更新发布

更行版本: 更改 package.json 里面的版本号并重新发布

**我们的package.json**

```
{
  "name": "testnpm",
  "version": "1.0.6",
  "description": "",
  "main": "dist/bundle.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "start": "webpack-dev-server --config webpack.dev.config.js",
    "dev": "webpack-dev-server --config webpack.dev.config.js",
    "build": "webpack --config webpack.prod.config.js"
  },
  "keywords": [],
  "author": "wangyuchao",
  "license": "ISC",
  "dependencies": {
    "oidc-client": "^1.10.1",
    "react": "16.12.0",
    "react-dom": "16.12.0",
    "react-router-dom": "^5.1.2"
  },
  "devDependencies": {
    "@babel/core": "7.8.3",
    "@babel/preset-env": "7.8.3",
    "@babel/preset-react": "7.8.3",
    "babel-loader": "8.0.6",
    "css-loader": "3.4.2",
    "html-webpack-plugin": "3.2.0",
    "style-loader": "1.1.2",
    "webpack": "4.41.5",
    "webpack-cli": "3.3.10",
    "webpack-dev-server": "3.10.1",
    "webpack-node-externals": "1.7.2"
  }
}
```




- 动态规划
- 贪心
- 分治
