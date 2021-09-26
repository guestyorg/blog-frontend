export const prices = [
  {
    name: "Any",
    min: 0,
    max: 0,
  },
  {
    name: `$1 to $10`,
    min: 1,
    max: 10,
  },
  {
    name: `$10 to $100`,
    min: 10,
    max: 100,
  },
  {
    name: `$100 to $1000`,
    min: 100,
    max: 1000,
  },
];
export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export function makeDataForTable(data) {
  // console.log('data:', data)

  // 0: {_id: '614598db2b13df118ae4e499', userId: {…}, title: 'hgfhgf', content: 'fdgfdg', createdAt: '2021-09-18T07:44:27.689Z', …}
  // 1: {_id: '6145bbdf289cfa7ba528a804', userId: {…}, title: 'fdsfsd', content: 'fdsfdsfds', createdAt: '2021-09-18T10:13:51.168Z', …}
  // 2: {_id: '6145bc59289cfa7ba528a805', userId: {…}, title: 'fdsfds', content: 'dfdsfdsfdfds', createdAt: '2021-09-18T10:15:53.914Z', …}
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    // console.log("data[i]: ", data[i]);

    const arrData = Object.entries(data[i]);
    // console.log("arrData:", arrData);

    // 0: (2) ['_id', '6141c0d7874998b51b3febd5']
    // 1: (2) ['userId', '6141bd2a874998b51b3febd4']
    // 2: (2) ['title', 'cool post']
    // 3: (2) ['content', 'this is a very good post! ']
    // 4: (2) ['createdAt', '2021-09-15T09:45:59.885Z']
    // 5: (2) ['updatedAt', '2021-09-15T09:45:59.885Z']

    // 0: (2) ['_id', '6145bbdf289cfa7ba528a804']
    // 1: (2) ['userId', {…}]
    // 2: (2) ['title', 'fdsfsd']
    // 3: (2) ['content', 'fdsfdsfds']
    // 4: (2) ['createdAt', '2021-09-18T10:13:51.168Z']
    // 5: (2) ['updatedAt', '2021-09-18T10:13:51.168Z']

    //     0: (2) ['_id', '6145bc59289cfa7ba528a805']
    // 1: (2) ['userId', {…}]
    // 2: (2) ['title', 'fdsfds']
    // 3: (2) ['content', 'dfdsfdsfdfds']
    // 4: (2) ['createdAt', '2021-09-18T10:15:53.914Z']
    // 5: (2) ['updatedAt', '2021-09-18T10:15:53.914Z']

    //  title: {
    //   children: 'John',
    // },

    const bigObj = {};

    for (let j = 0; j < arrData.length; j++) {
      const obj = {};
      // console.log("arrData[j]: ", arrData[j]);
      // console.log("arrData[0]: ",arrData[j][0]);
      // console.log("arrData[1]: ",arrData[j][1]);

      // console.log("obj:", obj);

      if (arrData[j][0] === "_id") {
        obj.children = arrData[j][1];
        //         obj= {children: '613e616d7ab4e566768e79d5'}

        bigObj.id = obj;
        //    bigObj= {id: {children: '613e616d7ab4e566768e79d5'}}

        bigObj._id = arrData[j][1];

        //   bigObj= {_id: '613e616d7ab4e566768e79d5'}
      } else if (
        arrData[j][0] === "createdAt" ||
        arrData[j][0] === "updatedAt"
      ) {
        // ['createdAt', '2021-09-13T08:46:49.849Z']

        obj.children = new Date(arrData[j][1]).toLocaleString();
        // {children: '9/13/2021, 11:46:49 AM'}

        bigObj[arrData[j][0]] = obj;

        // {createdAt: {children: '9/13/2021, 11:46:49 AM'}}
      } else if (arrData[j][0] === "userId") {
        // console.log("arrData:", arrData);

        // ['userId',  {_id: '613e1486e5218626969838f0', name: 'Karamba'}]
        obj.children = `${arrData[j][1].firstName} ${arrData[j][1].lastName}`;

        // {children: 'Karamba'}

        let emailObj = {};

        emailObj.children = arrData[j][1].email;

        bigObj["admin"] = obj;

        bigObj["email"] = emailObj;

        let accountObj = {};

        accountObj.children = arrData[j][1].accountId ? arrData[j][1].accountId.name: "";

        bigObj["account"] = accountObj;

        //{ accountId: {children: 'Karamba'}}
      } 
      else if (arrData[j][0] === "accountId") {
        // console.log("arrData:", arrData);

        // ['accountId',  {_id: '613e1486e5218626969838f0', name: 'Karamba'}]
        obj.children = arrData[j][1].name;

        // {children: 'Karamba'}

        bigObj[arrData[j][0]] = obj;
        //{ accountId: {children: 'Karamba'}}
      }
      
      else if (arrData[j][0] === "content") {
        // ['firstName', 'miki']

        obj.children = `${arrData[j][1].slice(0, 50)}...`;

        // {children: 'miki'}

        bigObj[arrData[j][0]] = obj;

        // firstName: {children: 'miki'}
      } else {
        // ['firstName', 'miki']

        obj.children = arrData[j][1];

        // {children: 'miki'}

        bigObj[arrData[j][0]] = obj;

        // firstName: {children: 'miki'}
      }

      // console.log("bigObj:", bigObj);

      // arr.push( `${arrData[j][0]}: {children: '${arrData[j][1]}',}`)
    }

    // console.log("bigObj:", bigObj);

    // arr.push({gilad:1,...data[i]})
    arr.push({ ...bigObj });
    // arr.push({ _id: `${counter}`, ...bigObj });

    // counter++;
  }

  console.log("arr: ", arr);

  return arr;

  //   0: {id: {…}, _id: '614598db2b13df118ae4e499', admin: {…}, email: {…}, account: {…}, …}

  // 0:
  // account: {children: 'gfdgfd'}
  // admin: {children: 'yyuyu uyuy'}
  // content: {children: 'fdgfdg...'}
  // createdAt: {children: '9/18/2021, 10:44:27 AM'}
  // email: {children: 'uu@gmail.com'}
  // id: {children: '614598db2b13df118ae4e499'}
  // title: {children: 'hgfhgf'}
  // updatedAt: {children: '9/18/2021, 10:44:27 AM'}
  


  // 1: {id: {…}, _id: '6145bbdf289cfa7ba528a804', admin: {…}, email: {…}, account: {…}, …}


//   1:
// account: {children: 'gfdgfd'}
// admin: {children: 'yyuyu uyuy'}
// content: {children: 'fdsfdsfds...'}
// createdAt: {children: '9/18/2021, 1:13:51 PM'}
// email: {children: 'uu@gmail.com'}
// id: {children: '6145bbdf289cfa7ba528a804'}
// title: {children: 'fdsfsd'}
// updatedAt: {children: '9/18/2021, 1:13:51 PM'}
// _id: "6145bbdf289cfa7ba528a804"

  // 2: {id: {…}, _id: '6145bc59289cfa7ba528a805', admin: {…}, email: {…}, account: {…}, …
  // account: {children: 'gfdgfd'}
  // admin: {children: 'yyuyu uyuy'}
  // content: {children: 'dfdsfdsfdfds...'}
  // createdAt: {children: '9/18/2021, 1:15:53 PM'}
  // email: {children: 'uu@gmail.com'}
  // id: {children: '6145bc59289cfa7ba528a805'}
  // title: {children: 'fdsfds'}
  // updatedAt: {children: '9/18/2021, 1:15:53 PM'}
  // _id: "6145bc59289cfa7ba528a805"


}
