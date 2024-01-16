export class Wrapper<T> {
    constructor(readonly raw: T) {}
}

export interface TreeItem {
    id: number;
    text: string;
    items?: TreeItem[];
}

export class ItemWrapper extends Wrapper<TreeItem> {
    readonly id = this.raw.id;
    readonly text = this.raw.text;
    readonly items!: ItemWrapper[];

    /**
     *
     */
    constructor(raw: TreeItem, readonly parent?: ItemWrapper) {
        super(raw);
        this.items = raw.items?.map((i) => new ItemWrapper(i, this)) || [];
    }
}

export function fetchData() {
    return Promise.resolve([
        {
            text: 'Furniture',
            id: 1,
            items: [
                {
                    text: 'Tables & Chairs',
                    id: 2,
                },
                {
                    text: 'Sofas',
                    id: 3,
                },
                {
                    text: 'Occasional Furniture',
                    id: 4,
                },
            ],
        },
        {
            text: 'Decor',
            id: 5,
            items: [
                {
                    text: 'Bed Linen',
                    id: 6,
                },
                {
                    text: 'Curtains & Blinds',
                    id: 7,
                },
                {
                    text: 'Carpets',
                    id: 8,
                },
            ],
        },
    ]);
}
