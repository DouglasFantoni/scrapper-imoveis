import { OmitType } from "@nestjs/graphql";
import { Imovel } from "src/graphql.schema";



export class ImovelDataDto extends OmitType(Imovel, ['websiteId', 'id']){


}