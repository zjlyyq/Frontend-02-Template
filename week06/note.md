# 重学CSS

Date: Aug 7, 2020

### css总体脑图

![%E9%87%8D%E5%AD%A6CSS%20f33edbfa9eff4eedbb10fb53b6c4e515/CSS.png](%E9%87%8D%E5%AD%A6CSS%20f33edbfa9eff4eedbb10fb53b6c4e515/CSS.png)

[%E9%87%8D%E5%AD%A6CSS%20f33edbfa9eff4eedbb10fb53b6c4e515/13_--CSS.pdf](%E9%87%8D%E5%AD%A6CSS%20f33edbfa9eff4eedbb10fb53b6c4e515/13_--CSS.pdf)

[https://www.w3.org/TR/selectors-3/#grammar](https://www.w3.org/TR/selectors-3/#grammar)

### 选择器

**基本语法**

- *****: 0 or more
- **+**: 1 or more
- **?**: 0 or 1
- **|**: separates alternatives
- [ ]: grouping

选择器组由一个或多个由逗号分隔的选择器组成

```bash
selectors_group
  : selector [ COMMA S* selector ]*
  ;
```

**选择器：**由一个或多个由*`组合器`链接的简单选择器组成*

```bash
selector
  : simple_selector_sequence [ combinator simple_selector_sequence ]*
  ;
```

**组合器：**主要是 `+`, `>`,  `~`,  `` 

```bash
combinator
  /* combinators can be surrounded by whitespace */
  : PLUS S* | GREATER S* | TILDE S* | S+
  ;
```

**简单选择器：**

```css
simple_selector_sequence
  : [ type_selector | universal ]
    [ HASH | class | attrib | pseudo | negation ]*
  | [ HASH | class | attrib | pseudo | negation ]+
  ;
```

简单选择器举例

```css
/* type_selector HASH */
div#app {
    font-size: 14px;
    height: 100%;
    background: #333;
    display: flex;
    justify-content: space-around;
}
/* type_selector class */
div.nav {
    width: 30%;
    background: #fff;
    display: inline-block;
}
/* type_selector attrib*/
div[contenteditable=true] {
    margin: 10px;
    flex: 1;
    background: #fff;
    display: inline-block;
    background: #b5b8b6;
    caret-color: aqua;
    text-indent: 1em;
}
/* type_selector attrib pseudo */
div[contenteditable=true]::before {
    content: '🏷';
    position: relative;
    left: -20px;
}
/* type_selector negation */
:not(div){
    color: red;
}
```

### 收集规则

**小脚本**

```jsx
var rulesstr = '[{"name":"Requirements for Chinese Text Layout中文排版需求","url":"https://www.w3.org/TR/2020/WD-clreq-20200801/"},{"name":"Media Queries Level 5","url":"https://www.w3.org/TR/2020/WD-mediaqueries-5-20200731/"},{"name":"Media Queries Level 4","url":"https://www.w3.org/TR/2020/CR-mediaqueries-4-20200721/"},{"name":"CSS Lists Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-lists-3-20200709/"},{"name":"CSS Inline Layout Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-inline-3-20200618/"},{"name":"CSS Containment Module Level 2","url":"https://www.w3.org/TR/2020/WD-css-contain-2-20200603/"},{"name":"CSS Overflow Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-overflow-3-20200603/"},{"name":"Encoding","url":"https://www.w3.org/TR/2020/NOTE-encoding-20200602/"},{"name":"Requirements for Hangul Text Layout and Typography : 한국어 텍스트 레이아웃 및 타이포그래피를 위한 요구사항","url":"https://www.w3.org/TR/2020/NOTE-klreq-20200527/"},{"name":"CSS Box Sizing Module Level 4","url":"https://www.w3.org/TR/2020/WD-css-sizing-4-20200526/"},{"name":"Ethiopic Layout Requirements","url":"https://www.w3.org/TR/2020/WD-elreq-20200526/"},{"name":"CSS Positioned Layout Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-position-3-20200519/"},{"name":"CSS Display Module Level 3","url":"https://www.w3.org/TR/2020/CR-css-display-3-20200519/"},{"name":"CSS Text Decoration Module Level 4","url":"https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/"},{"name":"CSS Ruby Layout Module Level 1","url":"https://www.w3.org/TR/2020/WD-css-ruby-1-20200429/"},{"name":"CSS Text Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-text-3-20200429/"},{"name":"CSS Box Model Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-box-3-20200421/"},{"name":"CSS Box Alignment Module Level 3","url":"https://www.w3.org/TR/2020/WD-css-align-3-20200421/"},{"name":"CSS Box Model Module Level 4","url":"https://www.w3.org/TR/2020/WD-css-box-4-20200421/"},{"name":"CSS Color Adjustment Module Level 1","url":"https://www.w3.org/TR/2020/WD-css-color-adjust-1-20200402/"},{"name":"CSS Speech Module","url":"https://www.w3.org/TR/2020/CR-css-speech-1-20200310/"},{"name":"CSS Transforms Module Level 2","url":"https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/"},{"name":"CSS Color Module Level 5","url":"https://www.w3.org/TR/2020/WD-css-color-5-20200303/"},{"name":"CSS Conditional Rules Module Level 4","url":"https://www.w3.org/TR/2020/WD-css-conditional-4-20200303/"},{"name":"Resize Observer","url":"https://www.w3.org/TR/2020/WD-resize-observer-1-20200211/"},{"name":"CSS Scroll Anchoring Module Level 1","url":"https://www.w3.org/TR/2020/WD-css-scroll-anchoring-1-20200211/"},{"name":"Timed Text Markup Language 2 (TTML2) (2nd Edition)","url":"https://www.w3.org/TR/2020/CR-ttml2-20200128/"},{"name":"CSS Basic User Interface Module Level 4","url":"https://www.w3.org/TR/2020/WD-css-ui-4-20200124/"},{"name":"CSS Writing Modes Level 3","url":"https://www.w3.org/TR/2019/REC-css-writing-modes-3-20191210/"},{"name":"CSS Grid Layout Module Level 2","url":"https://www.w3.org/TR/2019/WD-css-grid-2-20191203/"},{"name":"CSS Spatial Navigation Level 1","url":"https://www.w3.org/TR/2019/WD-css-nav-1-20191126/"},{"name":"CSS Containment Module Level 1","url":"https://www.w3.org/TR/2019/REC-css-contain-1-20191121/"},{"name":"CSS Text Module Level 4","url":"https://www.w3.org/TR/2019/WD-css-text-4-20191113/"},{"name":"CSS Fonts Module Level 4","url":"https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/"},{"name":"CSS Color Module Level 4","url":"https://www.w3.org/TR/2019/WD-css-color-4-20191105/"},{"name":"CSS Properties and Values API Level 1","url":"https://www.w3.org/TR/2019/WD-css-properties-values-api-1-20191025/"},{"name":"CSS Multi-column Layout Module Level 1","url":"https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/"},{"name":"CSS Images Module Level 3","url":"https://www.w3.org/TR/2019/CR-css-images-3-20191010/"},{"name":"CSS Text Decoration Module Level 3","url":"https://www.w3.org/TR/2019/CR-css-text-decor-3-20190813/"},{"name":"CSS Generated Content Module Level 3","url":"https://www.w3.org/TR/2019/WD-css-content-3-20190802/"},{"name":"CSS Writing Modes Level 4","url":"https://www.w3.org/TR/2019/CR-css-writing-modes-4-20190730/"},{"name":"CSS Table Module Level 3","url":"https://www.w3.org/TR/2019/WD-css-tables-3-20190727/"},{"name":"CSS Syntax Module Level 3","url":"https://www.w3.org/TR/2019/CR-css-syntax-3-20190716/"},{"name":"CSS Animation Worklet API","url":"https://www.w3.org/TR/2019/WD-css-animation-worklet-1-20190625/"},{"name":"CSS Overscroll Behavior Module Level 1","url":"https://www.w3.org/TR/2019/WD-css-overscroll-1-20190606/"},{"name":"CSS Values and Units Module Level 3","url":"https://www.w3.org/TR/2019/CR-css-values-3-20190606/"},{"name":"CSS Intrinsic & Extrinsic Sizing Module Level 3","url":"https://www.w3.org/TR/2019/WD-css-sizing-3-20190522/"},{"name":"CSS Easing Functions Level 1","url":"https://www.w3.org/TR/2019/CR-css-easing-1-20190430/"},{"name":"TTML Media Type Definition and Profile Registry","url":"https://www.w3.org/TR/2019/NOTE-ttml-profile-registry-20190411/"},{"name":"WebVTT: The Web Video Text Tracks Format","url":"https://www.w3.org/TR/2019/CR-webvtt1-20190404/"},{"name":"Non-element  Selectors  Module  Level 1","url":"https://www.w3.org/TR/2019/NOTE-selectors-nonelement-1-20190402/"},{"name":"CSS Scroll Snap Module Level 1","url":"https://www.w3.org/TR/2019/CR-css-scroll-snap-1-20190319/"},{"name":"CSS Pseudo-Elements Module Level 4","url":"https://www.w3.org/TR/2019/WD-css-pseudo-4-20190225/"},{"name":"CSS Transforms Module Level 1","url":"https://www.w3.org/TR/2019/CR-css-transforms-1-20190214/"},{"name":"CSS Values and Units Module Level 4","url":"https://www.w3.org/TR/2019/WD-css-values-4-20190131/"},{"name":"CSS Snapshot 2018","url":"https://www.w3.org/TR/2019/NOTE-css-2018-20190122/"},{"name":"Motion Path Module Level 1","url":"https://www.w3.org/TR/2018/WD-motion-1-20181218/"},{"name":"Filter Effects Module Level 1","url":"https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/"},{"name":"CSS Fragmentation Module Level 4","url":"https://www.w3.org/TR/2018/WD-css-break-4-20181218/"},{"name":"CSS Fragmentation Module Level 3","url":"https://www.w3.org/TR/2018/CR-css-break-3-20181204/"},{"name":"Geometry Interfaces Module Level 1","url":"https://www.w3.org/TR/2018/CR-geometry-1-20181204/"},{"name":"Selectors Level 4","url":"https://www.w3.org/TR/2018/WD-selectors-4-20181121/"},{"name":"CSS Flexible Box Layout Module Level 1","url":"https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/"},{"name":"CSS Shadow Parts","url":"https://www.w3.org/TR/2018/WD-css-shadow-parts-1-20181115/"},{"name":"Selectors Level 3","url":"https://www.w3.org/TR/2018/REC-selectors-3-20181106/"},{"name":"CSS Paged Media Module Level 3","url":"https://www.w3.org/TR/2018/WD-css-page-3-20181018/"},{"name":"Web Animations","url":"https://www.w3.org/TR/2018/WD-web-animations-1-20181011/"},{"name":"CSS Transitions","url":"https://www.w3.org/TR/2018/WD-css-transitions-1-20181011/"},{"name":"CSS Animations Level 1","url":"https://www.w3.org/TR/2018/WD-css-animations-1-20181011/"},{"name":"CSS Scrollbars Module Level 1","url":"https://www.w3.org/TR/2018/WD-css-scrollbars-1-20180925/"},{"name":"CSS Fonts Module Level 3","url":"https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/"},{"name":"Cascading  Style  Sheets,  level 1","url":"https://www.w3.org/TR/2018/SPSD-CSS1-20180913/"},{"name":"CSS Cascading and Inheritance Level 3","url":"https://www.w3.org/TR/2018/CR-css-cascade-3-20180828/"},{"name":"CSS Cascading and Inheritance Level 4","url":"https://www.w3.org/TR/2018/CR-css-cascade-4-20180828/"},{"name":"CSS Logical Properties and Values Level 1","url":"https://www.w3.org/TR/2018/WD-css-logical-1-20180827/"},{"name":"CSS Painting API Level 1","url":"https://www.w3.org/TR/2018/CR-css-paint-api-1-20180809/"},{"name":"CSS Basic User Interface Module Level 3 (CSS3 UI)","url":"https://www.w3.org/TR/2018/REC-css-ui-3-20180621/"},{"name":"CSS Color Module Level 3","url":"https://www.w3.org/TR/2018/REC-css-color-3-20180619/"},{"name":"DOMMatrix interface","url":"https://www.w3.org/TR/2018/NOTE-matrix-20180412/"},{"name":"CSS Layout API Level 1","url":"https://www.w3.org/TR/2018/WD-css-layout-api-1-20180412/"},{"name":"CSS Typed OM Level 1","url":"https://www.w3.org/TR/2018/WD-css-typed-om-1-20180410/"},{"name":"CSS Grid Layout Module Level 1","url":"https://www.w3.org/TR/2017/CR-css-grid-1-20171214/"},{"name":"CSS Counter Styles Level 3","url":"https://www.w3.org/TR/2017/CR-css-counter-styles-3-20171214/"},{"name":"CSS Backgrounds and Borders Module Level 3","url":"https://www.w3.org/TR/2017/CR-css-backgrounds-3-20171017/"},{"name":"CSS Overflow Module Level 4","url":"https://www.w3.org/TR/2017/WD-css-overflow-4-20170613/"},{"name":"CSS Fill and Stroke Module Level 3","url":"https://www.w3.org/TR/2017/WD-fill-stroke-3-20170413/"},{"name":"CSS Image Values and Replaced Content Module Level 4","url":"https://www.w3.org/TR/2017/WD-css-images-4-20170413/"},{"name":"CSS Rhythmic Sizing","url":"https://www.w3.org/TR/2017/WD-css-rhythm-1-20170302/"},{"name":"Ready-made Counter Styles","url":"https://www.w3.org/TR/2017/NOTE-predefined-counter-styles-20170216/"},{"name":"CSS Snapshot 2017","url":"https://www.w3.org/TR/2017/NOTE-css-2017-20170131/"},{"name":"CSS Round Display Level 1","url":"https://www.w3.org/TR/2016/WD-css-round-display-1-20161222/"},{"name":"Worklets Level 1","url":"https://www.w3.org/TR/2016/WD-worklets-1-20160607/"},{"name":"Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification","url":"https://www.w3.org/TR/2016/WD-CSS22-20160412/"},{"name":"CSS Device Adaptation Module Level 1","url":"https://www.w3.org/TR/2016/WD-css-device-adapt-1-20160329/"},{"name":"CSS Object Model (CSSOM)","url":"https://www.w3.org/TR/2016/WD-cssom-1-20160317/"},{"name":"CSSOM View Module","url":"https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/"},{"name":"CSS Custom Properties for Cascading Variables Module Level 1","url":"https://www.w3.org/TR/2015/CR-css-variables-1-20151203/"},{"name":"CSS Will Change Module Level 1","url":"https://www.w3.org/TR/2015/CR-css-will-change-1-20151203/"},{"name":"CSS Snapshot 2015","url":"https://www.w3.org/TR/2015/NOTE-css-2015-20151013/"},{"name":"CSS Page Floats","url":"https://www.w3.org/TR/2015/WD-css-page-floats-3-20150915/"},{"name":"Priorities for CSS from the Digital Publishing Interest Group","url":"https://www.w3.org/TR/2015/WD-dpub-css-priorities-20150820/"},{"name":"CSS Template Layout Module","url":"https://www.w3.org/TR/2015/NOTE-css-template-3-20150326/"},{"name":"CSS Exclusions Module Level 1","url":"https://www.w3.org/TR/2015/WD-css3-exclusions-20150115/"},{"name":"Compositing and Blending Level 1","url":"https://www.w3.org/TR/2015/CR-compositing-1-20150113/"},{"name":"Fullscreen","url":"https://www.w3.org/TR/2014/NOTE-fullscreen-20141118/"},{"name":"CSS Presentation Levels Module","url":"https://www.w3.org/TR/2014/NOTE-css3-preslev-20141014/"},{"name":"CSS  Mobile  Profile 2.0","url":"https://www.w3.org/TR/2014/NOTE-css-mobile-20141014/"},{"name":"CSS3 Hyperlink Presentation Module","url":"https://www.w3.org/TR/2014/NOTE-css3-hyperlinks-20141014/"},{"name":"CSS  TV  Profile 1.0","url":"https://www.w3.org/TR/2014/NOTE-css-tv-20141014/"},{"name":"CSS  Marquee  Module  Level 3","url":"https://www.w3.org/TR/2014/NOTE-css3-marquee-20141014/"},{"name":"The CSS ‘Reader’ Media Type","url":"https://www.w3.org/TR/2014/NOTE-css3-reader-20141014/"},{"name":"Behavioral Extensions to CSS","url":"https://www.w3.org/TR/2014/NOTE-becss-20141014/"},{"name":"CSS Regions Module Level 1","url":"https://www.w3.org/TR/2014/WD-css-regions-1-20141009/"},{"name":"CSS Line Grid Module Level 1","url":"https://www.w3.org/TR/2014/WD-css-line-grid-1-20140916/"},{"name":"CSS Masking Module Level 1","url":"https://www.w3.org/TR/2014/CR-css-masking-1-20140826/"},{"name":"CSS Font Loading Module Level 3","url":"https://www.w3.org/TR/2014/WD-css-font-loading-3-20140522/"},{"name":"CSS Generated Content for Paged Media Module","url":"https://www.w3.org/TR/2014/WD-css-gcpm-3-20140513/"},{"name":"SVG Integration","url":"https://www.w3.org/TR/2014/WD-svg-integration-20140417/"},{"name":"CSS Scoping Module Level 1","url":"https://www.w3.org/TR/2014/WD-css-scoping-1-20140403/"},{"name":"CSS Shapes Module Level 1","url":"https://www.w3.org/TR/2014/CR-css-shapes-1-20140320/"},{"name":"CSS Namespaces Module Level 3","url":"https://www.w3.org/TR/2014/REC-css-namespaces-3-20140320/"},{"name":"CSS Style Attributes","url":"https://www.w3.org/TR/2013/REC-css-style-attr-20131107/"},{"name":"Selectors  API  Level 2","url":"https://www.w3.org/TR/2013/NOTE-selectors-api2-20131017/"},{"name":"CSS Conditional Rules Module Level 3","url":"https://www.w3.org/TR/2013/CR-css3-conditional-20130404/"},{"name":"CSS Print Profile","url":"https://www.w3.org/TR/2013/NOTE-css-print-20130314/"},{"name":"Selectors API Level 1","url":"https://www.w3.org/TR/2013/REC-selectors-api-20130221/"},{"name":"Media Queries","url":"https://www.w3.org/TR/2012/REC-css3-mediaqueries-20120619/"},{"name":"Requirements for Japanese Text Layout","url":"https://www.w3.org/TR/2012/NOTE-jlreq-20120403/"},{"name":"A MathML for CSS Profile","url":"https://www.w3.org/TR/2011/REC-mathml-for-css-20110607/"},{"name":"Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification","url":"https://www.w3.org/TR/2011/REC-CSS2-20110607/"},{"name":"Cascading Style Sheets (CSS) Snapshot 2010","url":"https://www.w3.org/TR/2011/NOTE-css-2010-20110512/"},{"name":"Cascading Style Sheets (CSS) Snapshot 2007","url":"https://www.w3.org/TR/2011/NOTE-css-beijing-20110512/"},{"name":"Associating Style Sheets with XML documents 1.0 (Second Edition)","url":"https://www.w3.org/TR/2010/REC-xml-stylesheet-20101028/"},{"name":"Document Object Model (DOM) Level 2 Style Specification","url":"https://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/"},{"name":"CSS Techniques for Web Content Accessibility Guidelines 1.0","url":"https://www.w3.org/TR/2000/NOTE-WCAG10-CSS-TECHS-20001106/"},{"name":"Aural Cascading Style Sheets (ACSS) Specification","url":"https://www.w3.org/TR/1999/WD-acss-19990902"},{"name":"Positioning HTML Elements with Cascading Style Sheets","url":"https://www.w3.org/TR/1999/WD-positioning-19990902"},{"name":"CSS Printing Extensions","url":"https://www.w3.org/TR/1999/WD-print-19990902"},{"name":"List of suggested extensions to CSS","url":"https://www.w3.org/TR/1998/NOTE-CSS-potential-19981210"}]';
var standards = JSON.parse(rulesstr);
// console.log(rules);

var iframe = document.createElement('iframe');
document.body.innerHTML = "";
document.body.appendChild(iframe);

var handle = (url) => {
    return new Promise((resolve, reject) => {
        iframe.src = url;
        let load_callback = () => {
            iframe.removeEventListener('load', load_callback);
            resolve();
        };
        iframe.addEventListener('load', load_callback)
    }) 
}

void async function() {
    for (let standard of standards) {
        await handle(standard.url);
        // 获取属性区域节点
        console.log(iframe.contentDocument.querySelectorAll('.propdef'));
    }
}();
```

### 选择器优先级

复杂选择器的优先级

[https://codesandbox.io/embed/cssyouxianji-xnqgu?fontsize=14&hidenavigation=1&theme=dark](https://codesandbox.io/embed/cssyouxianji-xnqgu?fontsize=14&hidenavigation=1&theme=dark)

### 伪类

- any-link
- link
- visited
- hover
- active
- focus
- target

> 涉及到用户隐私安全，一旦设置了visite属性，便只能更改颜色等不影响排版的属性。否则，影响力排版等同于暴露了用户访问过那些网站。

### 伪元素

- ::before
- ::after
- ::first-line
- ::first-letter

**可用属性**

![%E9%87%8D%E5%AD%A6CSS%20f33edbfa9eff4eedbb10fb53b6c4e515/2020-08-08_21.27.37.png](%E9%87%8D%E5%AD%A6CSS%20f33edbfa9eff4eedbb10fb53b6c4e515/2020-08-08_21.27.37.png)

> 为什么first-letter可以设置float之类的，而first-line不行呢?