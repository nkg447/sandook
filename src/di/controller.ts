import { Container } from 'inversify';

// Interface imports end
// Entity imports begin
import BasicAuthController from '../controller/basic-auth';
import FileController from '../controller/file';
import JwtController from '../controller/jwt';
import ProductController from '../controller/product';
import SaleController from '../controller/sale';
import SystemController from '../controller/system';
import UserController from '../controller/user';
// Interface imports begin
import IBasicAuth from '../service/basic-auth';
import IFileService from '../service/file';
import IOAuth2 from '../service/oauth2';
import IProductService from '../service/product';
import ISaleService from '../service/sale';
import ISystemService from '../service/system';
import IUserService from '../service/user';
import { TYPES } from './types';

// Entity imports end

const container = new Container();

container.bind<IBasicAuth>(TYPES.BasicAuthController).to(BasicAuthController).inSingletonScope();
container.bind<IOAuth2>(TYPES.OAuth2Controller).to(JwtController).inSingletonScope();
container.bind<IUserService>(TYPES.UserController).to(UserController).inSingletonScope();
container.bind<IProductService>(TYPES.ProductController).to(ProductController).inSingletonScope();
container.bind<ISaleService>(TYPES.SaleController).to(SaleController).inSingletonScope();
container.bind<IFileService>(TYPES.FileController).to(FileController).inSingletonScope();
container.bind<ISystemService>(TYPES.SystemController).to(SystemController).inSingletonScope();

export default container;
