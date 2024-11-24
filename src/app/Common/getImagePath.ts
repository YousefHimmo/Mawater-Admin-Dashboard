export class GetImagePath {
    static getCategoryImage(imageGuid : string) : string{
        const path = `https://firebasestorage.googleapis.com/v0/b/mawaterqatar-17f8a.appspot.com/o/categories_images%2F${imageGuid}?alt=media&token=f4a000fb-c7d8-4eac-af7d-d1f70f33c19c`;
        return path;
    }

    static getMawaterImage(imageGuid : string) : string{
        const path = `https://firebasestorage.googleapis.com/v0/b/mawaterqatar-17f8a.appspot.com/o/mawater%2F${imageGuid}?alt=media&token=a4c70a33-bde6-4263-b044-0f7f95a7a76d`;
        return path;
    }

    static getBannerImage(imageGuid : string) : string{
        const path = `https://firebasestorage.googleapis.com/v0/b/mawaterqatar-17f8a.appspot.com/o/banner%2F${imageGuid}?alt=media&token=73cdea71-0149-47b2-9da4-6725f3d42358`;
        return path;
    }
    static getAdsImage(imageGuid : string) : string{
        const path = `https://firebasestorage.googleapis.com/v0/b/mawaterqatar-17f8a.appspot.com/o/ADS%2F${imageGuid}?alt=media&token=2967a733-250c-4ec8-b5b4-9024e57149ef`;
        return path;
    }
}
