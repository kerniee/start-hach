import config from "../config"

export async function getAccount(id) {
  let json;
  try {
    const url = new URL("accounts/" + id.toString(), config.backend.ip).href
    // const req_conf = {
    //   method: 'GET',
    //   mode: 'no-cors'
    // }
    const resp = await fetch(url)
    json = await resp.json()
  } catch (error) {
    console.log("Get account fetch error")
  }
  // json = [
  //   {
  //     id: "123",
  //     sessions: [
  //       '1',
  //       '2',
  //       '3'
  //     ]
  //   },
  //   {
  //     id: "234",
  //     sessions: [
  //       '1'
  //     ]
  //   },
  //   {
  //     id: "345",
  //     sessions: [
  //       '2'
  //     ]
  //   }
  //
  // ]
  return json;
}

export async function getSession(id) {
  let json;
  try {
    const url = new URL("sessions/" + id.toString(), config.backend.ip).href
    const resp = await fetch(url)
    json = await resp.json()
  } catch (error) {
    console.log("Get session fetch error")
  }
  return json;
}