"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const add_product_dto_1 = require("./add-product.dto");
class UpdateProductDto extends (0, mapped_types_1.PartialType)(add_product_dto_1.AddProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=update-product.dto.js.map