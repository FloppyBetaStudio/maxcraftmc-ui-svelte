<script>
  import {
    DatePicker,
    DatePickerInput,
    Heading,
    NumberInput,
    PasswordInput,
    RangeSlider,
    Search,
    Section,
    Select,
    SelectItem,
    Slider,
    TextArea,
    TextInput,
    TimePicker,
    TimePickerSelect,
  } from "../../../src/index.js";

  export let search = "";
  export let selectValue = "survival";
  export let slots = 6;
  export let taxRate = 5;
  export let rangeLow = 20;
  export let rangeHigh = 72;
</script>

<section class="surface" id="inputs">
  <Section level={2} tag="div">
    <Heading>Inputs</Heading>
  </Section>
  <div class="grid">
    <TextInput labelText="Minecraft ID" value="Steve" helperText="普通输入" />
    <TextInput labelText="错误状态" value="bad id" invalid invalidText="此 ID 不可用" />
    <TextInput labelText="警告状态" value="Alex" warn warnText="建议绑定 UUID" />
    <TextInput labelText="禁用状态" value="Disabled" disabled />
    <PasswordInput labelText="指令令牌" value="secret-token" />
    <PasswordInput labelText="错误令牌" value="bad-token" invalid invalidText="令牌无效" />
    <TextArea labelText="申请说明" value="希望加入服务器" />
    <TextArea labelText="错误说明" value="字数不足" invalid invalidText="请补充申请原因" />
    <Search labelText="搜索玩家" bind:value={search} />
    <Select labelText="目标服务器" bind:selected={selectValue}>
      <SelectItem value="survival" text="生存服" />
      <SelectItem value="creative" text="创造服" />
    </Select>
    <NumberInput label="席位数量" min={1} max={12} bind:value={slots} />
    <NumberInput label="税率" min={0} max={100} bind:value={taxRate} invalid invalidText="税率过高" />
    <Slider labelText="音量" min={0} max={100} bind:value={taxRate} />
    <RangeSlider
      labelText="资源区间"
      min={0}
      max={100}
      bind:value={rangeLow}
      bind:valueUpper={rangeHigh}
      minLabel="低"
      maxLabel="高"
    />
    <DatePicker datePickerType="single" value="2026-06-05">
      <DatePickerInput labelText="维护日期" placeholder="yyyy-mm-dd" />
    </DatePicker>
    <TimePicker labelText="重启时间" value="04:00">
      <TimePickerSelect>
        <SelectItem value="AM" text="AM" />
        <SelectItem value="PM" text="PM" />
      </TimePickerSelect>
    </TimePicker>
  </div>
</section>

<style>
  .surface {
    display: grid;
    min-width: 0;
    gap: 1rem;
    padding: 1rem;
    border: 4px solid var(--mc-border);
    background: var(--cds-layer);
    box-shadow: var(--mc-shadow-block);
  }

  .grid {
    display: grid;
    min-width: 0;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
    align-items: start;
  }

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
