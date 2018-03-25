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
    testData: []
  },
  ready(){
    this.setData({
      testData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapBg(event){
      if( event.target.id !== 'cover-card-container' ){
        return;
      }
       this.triggerEvent('close')
      // if( typeof this.properties.close === 'function' ){
      //   this.properties.close();
      // }
    }
  }
})
