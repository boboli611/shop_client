const getSearchData = require('./search.js');

const mockServiceFactory = (data) => {
  return new Promise((res)=>{
    setTimeout(()=>{
      res(data);
    }, 200);
  })
}
const index = () => {
  const data = {
    banner: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
    categories: [
      {
        img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
        name: '毛衣'
      },
      {
        img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
        name: '毛衣2'
      },
      {
        img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
        name: '毛衣3'
      },
      {
        img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
        name: '毛衣4'
      },
      {
        img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
        name: '毛衣5'
      },
      {
        img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
        name: '毛衣6'
      }
    ],
    skuList: [
      {
        title: '新品推荐',
        skus: [
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          }
        ]
      },
      {
        title: '热销榜',
        skus: [
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          },
          {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
          }
        ]
      }
    ]
  }
  return mockServiceFactory(data);
}

const search = () => {
  return mockServiceFactory( getSearchData() );
}

module.exports = {
  index,
  search
}