import { ROUTES, shops } from '@config';

const pickShopType = (shopName) => {

    return shopName === shops[0]
        ? ROUTES.Tarven
        : shopName === shops[1]
            ? ROUTES.Grocery
            : shopName === shops[2]
                ? ROUTES.Hardware
                : shopName === shops[3]
                    ? ROUTES.Fashion
                    : shopName === shops[4]
                        ? ROUTES.Food
                        : ROUTES.NotFound


}

export default pickShopType