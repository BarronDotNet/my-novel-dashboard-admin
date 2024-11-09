'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const mainCategoriesOptions = [
  { label: 'กำลังภายใน', value: 'กำลังภายใน' },
  { label: 'โรแมนติก', value: 'โรแมนติก' },
  { label: 'แฟนตาซี', value: 'แฟนตาซี' },
  { label: 'รักวัยรุ่น', value: 'รักวัยรุ่น' },
  { label: 'สืบสวน', value: 'สืบสวน' },
  { label: 'Girl love', value: 'Girl love' },
  { label: 'Boy love', value: 'Boy love' },
  { label: 'Idol/Fanfic', value: 'Idol/Fanfic' },
  { label: 'ดราม่า', value: 'ดราม่า' },
  { label: 'ผจญภัย', value: 'ผจญภัย' },
  { label: 'ฮาเร็ม', value: 'ฮาเร็ม' },
  { label: 'ระทึกขวัญ', value: 'ระทึกขวัญ' },
  { label: 'คอมเมดี้', value: 'คอมเมดี้' },
  { label: 'ต่อสู้', value: 'ต่อสู้' },
  { label: 'กีฬา', value: 'กีฬา' },
  { label: 'เกม', value: 'เกม' },
  { label: 'ปีศาจ/ภูติ/ไสยเวท', value: 'ปีศาจ/ภูติ/ไสยเวท' },
  { label: 'ชีวิตในโรงเรียน', value: 'ชีวิตในโรงเรียน' },
  { label: 'อวกาศ', value: 'อวกาศ' },
  { label: 'ดราม่าชีวิต', value: 'ดราม่าชีวิต' },
  { label: 'ตลกขบขัน', value: 'ตลกขบขัน' },
  { label: 'แอคชั่น', value: 'แอคชั่น' },
];

const secondaryCategoriesOptions = [
  { label: 'กำลังภายใน', value: 'กำลังภายใน' },
  { label: 'โรแมนติก', value: 'โรแมนติก' },
  { label: 'แฟนตาซี', value: 'แฟนตาซี' },
  { label: 'รักวัยรุ่น', value: 'รักวัยรุ่น' },
  { label: 'สืบสวน', value: 'สืบสวน' },
  { label: 'Girl love', value: 'Girl love' },
  { label: 'Boy love', value: 'Boy love' },
  { label: 'Idol/Fanfic', value: 'Idol/Fanfic' },
  { label: 'ดราม่า', value: 'ดราม่า' },
  { label: 'ผจญภัย', value: 'ผจญภัย' },
  { label: 'ฮาเร็ม', value: 'ฮาเร็ม' },
  { label: 'ระทึกขวัญ', value: 'ระทึกขวัญ' },
  { label: 'คอมเมดี้', value: 'คอมเมดี้' },
  { label: 'ต่อสู้', value: 'ต่อสู้' },
  { label: 'กีฬา', value: 'กีฬา' },
  { label: 'เกม', value: 'เกม' },
  { label: 'ปีศาจ/ภูติ/ไสยเวท', value: 'ปีศาจ/ภูติ/ไสยเวท' },
  { label: 'ชีวิตในโรงเรียน', value: 'ชีวิตในโรงเรียน' },
  { label: 'อวกาศ', value: 'อวกาศ' },
  { label: 'ดราม่าชีวิต', value: 'ดราม่าชีวิต' },
  { label: 'ตลกขบขัน', value: 'ตลกขบขัน' },
  { label: 'แอคชั่น', value: 'แอคชั่น' },
];

const rateOptions = [
  { label: 'ทั่วไป', value: 'ทั่วไป' },
  { label: '18+', value: '18+' },
  { label: '25+', value: '25+' },
];

const SelectField = ({
  label,
  options,
  selectedValue,
  onChange,
}: SelectFieldProps) => (
  <div>
    <Select value={selectedValue} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`เลือก ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

interface EditBookOptionsProps {
  mainCategory: string;
  setMainCategory: (value: string) => void;
  secondaryCategory: string;
  setSecondaryCategory: (value: string) => void;
  rate: string;
  setRate: (value: string) => void;
}

const EditBookOptions = ({
  mainCategory,
  setMainCategory,
  secondaryCategory,
  setSecondaryCategory,
  rate,
  setRate,
}: EditBookOptionsProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="หมวดหมู่หลัก">หมวดหลัก</Label>
        <SelectField
          label="หมวดหลัก"
          options={mainCategoriesOptions}
          selectedValue={mainCategory}
          onChange={setMainCategory}
        />
      </div>
      <div>
        <Label htmlFor="หมวดหมู่รอง">หมวดรอง</Label>
        <SelectField
          label="หมวดรอง"
          options={secondaryCategoriesOptions}
          selectedValue={secondaryCategory}
          onChange={setSecondaryCategory}
        />
      </div>
      <div>
        <Label htmlFor="เรตติ้ง">เรตติ้ง</Label>
        <SelectField
          label="เรตติ้ง"
          options={rateOptions}
          selectedValue={rate}
          onChange={setRate}
        />
      </div>
    </div>
  );
};

export default EditBookOptions;
