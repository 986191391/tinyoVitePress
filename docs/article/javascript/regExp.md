# 正则表达式

参考： [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

例举常见的字符如下：

| 字符        | 含义           |
| ------------- |:-------------:|
| ^| <div style="textAlign: left;">匹配输入的开始。如果多行标志被设置为 true，那么也匹配换行符后紧跟的位置。 <br>例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。</div>  |
| $ | <div style="textAlign: left;">匹配输入的结束。如果多行标志被设置为 true，那么也匹配换行符前的位置。 <br> 例如，/t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。</div>  |
| * | <div style="textAlign: left;">匹配前一个表达式 0 次或多次。等价于 {0,}。 <br> 例如，/bo*/ 会匹配 "A ghost boooooed" 中的 'booooo' 和 "A bird warbled" 中的 'b'，但是在 "A goat grunted" 中不会匹配任何内容。</div>  |
| + | <div style="textAlign: left;">匹配前面一个表达式 1 次或者多次。等价于 {1,}。 <br> 例如，/a+/ 会匹配 "candy" 中的 'a' 和 "caaaaaaandy" 中所有的 'a'，但是在 "cndy" 中不会匹配任何内容。</div>  |
| ? | <div style="textAlign: left;">匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。 <br> 例如，/e?le?/ 匹配 "angel" 中的 'el'、"angle" 中的 'le' 以及 "oslo' 中的 'l'。</div>  |
| x\|y | <div style="textAlign: left;">匹配‘x’或者‘y’。 <br> 例如，/green\|red/匹配“green apple”中的‘green’和“red apple”中的‘red’</div>  |
| {n} | <div style="textAlign: left;">n 是一个正整数，匹配了前面一个字符刚好出现了 n 次。 <br> 比如， /a{2}/ 不会匹配“candy”中的'a',但是会匹配“caandy”中所有的 a，以及“caaandy”中的前两个'a'。</div>  |
| {n,m} | <div style="textAlign: left;">n 和 m 都是整数。匹配前面的字符至少 n 次，最多 m 次。如果 n 或者 m 的值是 0，这个值被忽略。 <br> 例如，/a{1, 3}/ 并不匹配“cndy”中的任意字符，匹配“candy”中的 a，匹配“caandy”中的前两个 a，也匹配“caaaaaaandy”中的前三个 a。注意，当匹配”caaaaaaandy“时，匹配的值是“aaa”，即使原始的字符串中有更多的 a。 </div> |
| \b | <div style="textAlign: left;">匹配一个词的边界。一个词的边界就是一个词不被另外一个“字”字符跟随的位置或者前面跟其他“字”字符的位置，例如在字母和空格之间。注意，匹配中不包括匹配的字边界。换句话说，一个匹配的词的边界的内容的长度是 0。<br>使用"moon"举例：<br>/\bm/匹配“moon”中的‘m’；<br>/oo\b/并不匹配"moon"中的'oo'，因为'oo'被一个“字”字符'n'紧跟着。<br>/oon\b/匹配"moon"中的'oon'，因为'oon'是这个字符串的结束部分。这样他没有被一个“字”字符紧跟着。</div> |
| \d | <div style="textAlign: left;">匹配一个数字。等价于 [0-9]。<br> 例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'。</div> |
| \w | <div style="textAlign: left;">匹配一个单字字符（字母、数字或者下划线）。等价于 [A-Za-z0-9_]。<br>例如，/\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' 和 "3D." 中的 '3'。</div> |
| \s | <div style="textAlign: left;">匹配一个空白字符，包括空格、制表符、换页符和换行符。等价于 `[\f\n\r\t\v\u0020\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`。 <br> 例如，/\s\w*/ 匹配"foo bar."中的' bar'。</div> |


开发常见正则表达式：

```js
//用户名正则，8到16位（字母，数字，下划线）
var uPattern = /^[a-zA-Z0-9_]{8,16}$/;

//正整数正则
var posPattern = /^\d+$/;
//负整数正则
var negPattern = /^-\d+$/;
//整数正则
var intPattern = /^-?\d+$/;

//Email正则
var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//手机号正则
var mPattern = /^1[34578]\d{9}$/; 

```

实现以下笔试题

```js
let str = '100000000000'

// 输出 100,000,000,000

str.replace(/\B(?=((\d{3})+)$)/g, ',')
```