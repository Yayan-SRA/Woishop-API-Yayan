const productRepository = require("../repositories/productRepository");

module.exports = {
    
    async productList() {
    try {
      const dataList = await productRepository.findAllProduct();
      return dataList
    } catch (err) {
      throw err;
    }
  },

  async categoryList() {
    try {
      const categoryList = await productRepository.findAllCategory();
      return categoryList
    } catch (err) {
        throw err;
    }
  },
  
  async productDetail({id}) {
    console.log("masuk sini", id)
    try {
        const result = await productRepository.productDetail({id});
        console.log("isi result", result)
        return result;
    } catch (error) {
        throw err;
    }
  },

  async productFilter({kate}) {
    try {
      const data = await productRepository.productFilter({kate});
      return data;
    } catch (error) {
        throw err;
    }
},

create(requestBody) {
  return productRepository.create(requestBody);
},
};
