// status: 1默认地址,0非默认
const getAddressData = {
  "sucess":true,
  "msg":"",
  "data":[
    {
      "id":19,
      "user_id":7,
      "name":"werwe",
      "mobile":"13738055766",
      "province": "广东省",
      "city": "广州市",
      "county": "天河区",
      "address":"某小区4栋 3单元 201室某小区4栋 3单元 201室某小区4栋 3单元 201室",
      "status":0,
      "updated_at":"2018-03-12 23:39:24",
      "created_at":"2018-01-28 23:21:00"
    },
    {
      "id":20,
      "user_id":7,
      "name":"werwe",
      "mobile":"13738055766",
      "province": "广东省",
      "city": "广州市",
      "county": "天河区",
      "address":"某小区4栋 3单元 201室2222",
      "status":1,
      "updated_at":"2018-03-12 23:39:24",
      "created_at":"2018-01-28 23:21:00"
    },
    {
      "id":211,
      "user_id":7,
      "name":"werwe",
      "mobile":"13738055766",
      "province": "广东省",
      "city": "广州市",
      "county": "天河区",
      "address":"某小区4栋 3单元 201室33333",
      "status": 0,
      "updated_at":"2018-03-12 23:39:24",
      "created_at":"2018-01-28 23:21:00"
    }
  ],
  "errno":0
};

const updateAddressData = {
  "sucess":true,
  "msg":"",
  "data":{
    "id":23
  },
  "errno":0
}


const mockAddresssService = {
  get(){
    getAddressData.msg = 'get';
    return JSON.parse(JSON.stringify(getAddressData));
  },
  add(){
    getAddressData.msg = 'add';
    return JSON.parse(JSON.stringify(updateAddressData));
  },
  update(){
    getAddressData.msg = 'update';
    return JSON.parse(JSON.stringify(updateAddressData));
  },
  delete(){
    getAddressData.msg = 'delete';
    return JSON.parse(JSON.stringify(updateAddressData));
  }
}
module.exports = mockAddresssService;
