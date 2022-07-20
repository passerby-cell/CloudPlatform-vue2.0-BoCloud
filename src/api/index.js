//对api进行统一的管理
import apirequest from "./apiAjax";
import mockrequest from "./mockAjax";

// 接口示例
// // 登录接口
export const reqUserLogin = (data) =>
  apirequest({
    url: "/paas-web/upmstreeapi/login",
    method: "POST",
    data,
  });
export const reqUserToken = (code) =>
  apirequest({
    url: "/paas-web/upmstreeapi/accessToken",
    method: "get",
    params: {
      code,
    },
  });

export const reqJobList = (data) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/vcJob/list",
    method: "post",
    data,
  });

export const reqDeleteJob = (clusterId, vcJobId) =>
  apirequest({
    url: "/paas-web/bocapi/volcano/v3.3/vcJob/delete",
    method: "post",
    data: {
      clusterId,
      vcJobId,
    },
  });

export const reqParentFile = (type, self, isPlatform) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/list",
    method: "get",
    params: {
      type,
      self,
      isPlatform,
    },
  });

export const reqChildFileList = (dataId, filePath, current, size) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/pageList",
    method: "get",
    params: {
      dataId,
      filePath,
      current,
      size,
    },
  });

export const reqCreateParentFile = (name, remark, storageId, type) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/add",
    method: "post",
    data: {
      name,
      remark,
      storageId,
      type,
    },
  });

export const reqDeleteParentFile = (id) =>
  apirequest({
    url: `/paas-web/bocapi/dataBcc/${id}`,
    method: "delete",
  });

export const reqUpdateParentFileName = (id, name, remark, storageId, type) =>
  apirequest({
    url: "/paas-web/bocapi/dataBcc/update",
    method: "put",
    data: {
      id,
      name,
      remark,
      storageId,
      type,
    },
  });

export const reqUpdateChildFileName = (dataId, filePath, fileName, newName) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/rename",
    method: "get",
    params: {
      dataId,
      filePath,
      fileName,
      newName,
    },
  });

export const reqCreateChildFolder = (dataId, filePath, folderName, desc) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/createFolder",
    method: "get",
    params: {
      dataId,
      filePath,
      folderName,
      desc,
    },
  });

export const reqDeleteChildFile = (dataId, fileList, filePath) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/deleteFiles",
    method: "post",
    data: {
      dataId,
      fileList,
      filePath,
    },
  });

export const reqUploadChildFile = (
  currentChunkSize,
  totalSize,
  identifier,
  filename,
  relativePath,
  filePath,
  dataId,
  file
) =>
  apirequest({
    url: "/paas-web/bocapi/fileBcc/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      chunkNumber: "1",
      chunkSize: "2048000",
      currentChunkSize,
      totalSize,
      identifier,
      filename,
      relativePath,
      totalChunks: "1",
      filePath,
      rootPath: "/opt/bcc/storage1/NFS3",
      dataId,
      file,
    },
  });

export const reqImagelIST = (
  currPageNum,
  imageCatalogId,
  imageCatalogType,
  imageName,
  pageSize,
  warehouseId
) =>
  apirequest({
    url: "/paas-web/bocapi/image/v2.3/queryRegImageList",
    method: "post",
    data: {
      currPageNum,
      imageCatalogId,
      imageCatalogType,
      imageName,
      pageSize,
      warehouseId,
    },
  });

export const reqImageVersionlIST = (currPageNum, imageName, pageSize) =>
  apirequest({
    url: "/paas-web/bocapi/image/v2.3/queryRegImageVersionList",
    method: "post",
    data: {
      currPageNum,
      imageName,
      pageSize,
    },
  });

  export const reqImageOverview = (envId) =>
  apirequest({
    url: "/paas-web/bocapi/warehouse/v2.3/overview",
    method: "post",
    data: {
      envId: envId||1,
    },
  });