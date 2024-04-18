import { useState, useCallback, useEffect } from 'react';
import { CheckboxGroup, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react';
import { filterList, levelOptions, matchTextColor } from '@/data/options';
import { data, rebuildData } from '@/data/data';
import { ItemData } from './data/data.type';
import CustomCheckbox from '@/components/CustomCheckBox/CustomCheckbox.tsx';

let originList = rebuildData(JSON.parse(window.localStorage.getItem('data') || '[]'));
const keys = Object.keys(matchTextColor) as (keyof typeof matchTextColor)[];

const RenderDesc = ({ desc }: { desc: string }) => {
  // const index = keys.findIndex(item => desc.includes(item));
  let dom = desc;
  keys.forEach((item, i) => {
    if (desc.includes(item)) {
      dom = desc.replace(item, `<span style="color:var(${matchTextColor[item]})">${item}</span>`);
    }
  });
  return (
    <div
      className="flex-1 text-[#e8dfe2]"
      dangerouslySetInnerHTML={{ __html: dom }}></div>
  );
};

export default function App() {
  const [rows, setRows] = useState<ItemData[]>([]);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [level, setLevel] = useState(new Set(['']));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const changeSelect = (val: string[]) => {
    setGroupSelected(val);
  };

  const onLevelChange = (val: any) => {
    setLevel(val);
  };
  const onSave = (onClose: any) => {
    try {
      const val = JSON.parse(value);
      if (typeof val === 'object') {
        window.localStorage.setItem('data', value);
        originList = rebuildData(val);
        setRows(originList);
        setGroupSelected([]);
        setLevel(new Set(['']));
        setErrorMessage('');
        setValue('');
        onClose();
      } else {
        setErrorMessage('数据异常')
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('数据异常')
    }

  };

  useEffect(() => {
    const list = originList.filter(item => {
      if (groupSelected.length || level.values().next().value) {
        const isSelected = groupSelected.length ? groupSelected.some(v => item.desc?.includes(v)) : true;
        return isSelected && parseInt(`${item.level}`) >= parseInt(level.values().next().value || '0');
      }
      return true;
    });
    setRows(list);
  }, [level, groupSelected]);

  return (
    <div>
      <header className="w-full border-b-1 border-solid border-zinc-400 sticky top-0 z-10 bg-background">
        <div className="p-4 max-w-[1400px] mx-auto">
          <div className="flex flex-row gap-2 mb-4 items-center">
            <Select
              label="物品等级:"
              className="max-w-xs"
              size="sm"
              variant="bordered"
              radius="full"
              selectedKeys={level}
              onSelectionChange={onLevelChange}>
              {levelOptions.map(opt => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
            <Button
              radius="full"
              color="secondary"
              onClick={onOpen}>
              导入
            </Button>
          </div>
          <CheckboxGroup
            className="gap-1"
            label=""
            orientation="horizontal"
            value={groupSelected}
            onChange={changeSelect}>
            {filterList.map((item, i) => (
              <CustomCheckbox
                value={item.label}
                key={i}>
                {item.display || item.label}
              </CustomCheckbox>
            ))}
          </CheckboxGroup>
        </div>
      </header>
      <main className="p-4">
        <div className="max-w-[1000px] mx-auto text-medium">
          <div className="py-3 flex flex-row text-left text-white mb-4">
            <div className="w-[120px] ">名称</div>
            <div className="w-20">等级</div>

            <div className="flex-1">词缀</div>
            <div className="w-[200px]">词缀等级</div>
            <div className="w-20">市集数量</div>
            <div className="w-20">价格</div>
          </div>

          {rows.map(item => (
            <div
              className="py-3 flex flex-row text-left text-gray"
              key={item.id}>
              <div className="w-[120px] text-def">{item.name}</div>
              <div className="w-20">{item.level}</div>
              {/* <div className="flex-1 text-[#e8dfe2]">{item.desc}</div> */}
              <RenderDesc desc={item.desc || ''} />
              <div className="w-[200px]">{item.affixLevel}</div>
              <div className="w-20">{item.count}</div>
              <div className="w-20 text-def">{item.calculated.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </main>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">导入数据</ModalHeader>
              <ModalBody>
                <div>
                  点击前往{' '}
                  <a
                    className="text-blue-400"
                    target="_blank"
                    href="https://price.filtereditor.cn/">
                    物价榜
                  </a>
                </div>
                <Textarea
                  label="物品数据"
                  placeholder="在这里粘贴"
                  className="w-full"
                  maxRows={7}
                  minRows={7}
                  value={value}
                  onValueChange={setValue}
                />
                <div className="text-danger">{errorMessage}</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}>
                  关闭
                </Button>
                <Button
                  color="secondary"
                  onPress={() => {
                    onSave(onClose)
                  }}>
                  保存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
