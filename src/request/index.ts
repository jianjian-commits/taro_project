import { request } from "@tarojs/taro"

const basePath = __BASE_PATH__

export async function fetchData(data) {
  return await request({
    url:
      basePath + "/ceres/purchase/PurchaseService/GetPurchaseOrderBySupplier",
    method: "POST",
    header: {
      authorization: "05b945158d00000166c5da879bc26b4611",
    },
    data,
  })
}
