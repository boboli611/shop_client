// components/cover-card/cover-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    close: {
      type: Function
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapBg(event){
       this.triggerEvent('close');
    }
  }
})
