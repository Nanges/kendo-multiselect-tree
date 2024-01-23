import { getMultiSelectTreeValue, MultiSelectTree, MultiSelectTreeChangeEvent } from '@progress/kendo-react-dropdowns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FilesButton } from './file-button';
import { FormField, Input, Label } from './form-field';
import { conditionalTag, Tag } from './rendering';
import { fetchData, ItemWrapper } from './tree-data';
import { expandedState, processMultiSelectTreeData } from './tree-data-ops';

const dataItemKey = 'id';
const checkField = 'checkField';
const checkIndeterminateField = 'checkIndeterminateField';
const subItemsField = 'items';
const expandField = 'expanded';
const textField = 'text';
const fields = {
    dataItemKey,
    checkField,
    checkIndeterminateField,
    expandField,
    subItemsField,
};

function App() {
    // hooks
    const [value, setValue] = useState<ItemWrapper[]>([]);
    const [data, setData] = useState<ItemWrapper[]>([]);
    const [expanded, setExpanded] = useState<any[]>([]);
    const onExpandChange = useCallback((event: any) => setExpanded(expandedState(event.item, dataItemKey, expanded)), [expanded]);
    const treeData = useMemo(
        () =>
            processMultiSelectTreeData(data, {
                expanded,
                value,
                ...fields,
            }),
        [expanded, value, data]
    );

    // Initializer
    useEffect(() => {
        fetchData().then((d) => {
            setData(d.map((d) => new ItemWrapper(d)));
            setExpanded([d[0][dataItemKey]]);
        });
    }, []);

    // Handlers
    const onChange = (event: MultiSelectTreeChangeEvent) => {
        const newValue: ItemWrapper[] = getMultiSelectTreeValue(data, {
            ...fields,
            ...event,
            value,
        } as any);

        if (event.operation === 'delete') {
            const [deleted] = event.items as ItemWrapper[];
            setValue(newValue.filter((v) => v.parent !== deleted));

            return;
        }

        setValue(newValue);
    };

    // Create dynamic component using kind of HoC
    const EnhancedTag = conditionalTag(value, Tag);

    return (
        <>
            <fieldset>
                <MultiSelectTree
                    style={{
                        width: '300px',
                    }}
                    data={treeData}
                    value={value}
                    onChange={onChange}
                    placeholder="Please select ..."
                    textField={textField}
                    dataItemKey={dataItemKey}
                    checkField={checkField}
                    checkIndeterminateField={checkIndeterminateField}
                    subItemsField={subItemsField}
                    expandField={expandField}
                    onExpandChange={onExpandChange}
                    label={'Category'}
                    tag={EnhancedTag}
                />
            </fieldset>
            <FilesButton filesSelected={console.log} accept=".docx" style={{ display: 'inline-block', padding: '8px 16px' }}>
                Select file
            </FilesButton>
            <FormField className="mb-200">
                <Label>nom</Label>
                <Input type="text" />
            </FormField>
            <FormField className="mb-200">
                <Label>prenom</Label>
                <Input type="text" />
                <p>Foo</p>
            </FormField>
        </>
    );
}

export default App;
