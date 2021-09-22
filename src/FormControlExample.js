import React from 'react';
import Section from '@guestyci/foundation/legacy/Section';
import Table, { Column } from '@guestyci/foundation/legacy/Table';
import HeaderCell from '@guestyci/foundation/legacy/Table/HeaderCell';
import Cell from '@guestyci/foundation/legacy/Table/Cell';

import ActionTooltip from '@guestyci/foundation/legacy/ActionTooltip';

// import data from '@guestyci/foundation/';


const data=[
  {
    _id: '1',
    id: {
      children: '12345tdgfbvm',
    },
    firstName: {
      children: 'John',
    },
    lastName: {
      children: 'Doe',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 1',
    },
    businessModel: {
      href: 'financial/business-models/1',
      target: '_blank',
      title: 'business model #1',
    },
    periodStartDate: {
      date: '2020-10-01T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-11-29T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 100,
    },
    tags: {
      tags: ['Email'],
    },
    user: {
      name: 'Frank Sinatra',
      img: 'https://i.pravatar.cc/150?u=1',
    },
    status: {
      status: 'PENDING',
    },
  },
  {
    _id: '2',
    id: {
      children: '12343tdgfbvm',
    },
    firstName: {
      children: 'Jonathan',
    },
    lastName: {
      children: 'Yehie',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    businessModel: {
      href: 'financial/business-models/2',
      target: '_blank',
      title: 'business model #2',
    },
    periodEndDate: {
      date: null,
    },
    price: {
      currency: 'EUR',
      value: 20000000000,
    },
    tags: {
      tags: ['Email', 'Phone', 'Owners Portal'],
    },
    user: {
      name: 'Frank Sinatra',
    },
    status: {
      status: 'APPROVED',
    },
  },
  {
    _id: '3',
    id: {
      children: '43345tdgfbvm',
    },
    firstName: {
      children: 'Aram',
    },
    lastName: {
      children: 'Ben Shushan Erlich',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 3',
    },
    periodStartDate: {
      date: '2020-07-05T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-11-15T00:00:00.000Z',
    },
    price: {
      currency: 'UAH',
      value: 300,
    },
    user: {
      img: 'https://i.pravatar.cc/150?u=1',
      name: 'John Doe',
    },
    status: {
      status: 'FLAGGED',
    },
  },
  {
    _id: '4',
    id: {
      children: '1234rgdgfbvm',
    },
    firstName: {
      children: 'Nik',
    },
    lastName: {
      children: 'Frank',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-06-04T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-08-29T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    tags: {
      tags: ['Email', 'Phone'],
    },
    user: {
      name: 'Frank Sinatra',
    },
    status: {
      status: 'ARCHIVED',
    },
  },
  {
    _id: '5',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Gil',
    },
    lastName: {
      children: 'Tabak',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-01-02T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    user: {
      name: 'Frank Sinatra',
    },
    status: {
      status: 'REGENERATING',
    },
    actions: {
      isActionInProgress: true, // NOTE: this property will not come from data, this is used just for the demo sake
    },
  },
  {
    _id: '6',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Gil',
    },
    lastName: {
      children: 'Tabak',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-01-02T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    user: {
      name: 'Gil Tabak',
      img: 'https://i.pravatar.cc/150?u=6',
    },
    status: {
      status: 'REGENERATION_FAILED',
    },
  },
  {
    _id: '7',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Richard',
    },
    lastName: {
      children: 'Brook',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 7',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    user: {},
  },
  {
    _id: '8',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Gil',
    },
    lastName: {
      children: 'Tabak',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-01-02T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    user: {
      name: 'Gil Tabak',
      img: 'https://i.pravatar.cc/150?u=6',
    },
    status: {
      status: 'REGENERATION_REQUIRED',
    },
  },
]

const ActionTooltipBody = () => (
  <>
    <b>bold text (wrapped in bold tag)</b>
    this text was wrapped in a div before and was sent as -body- to
    -ActionTooltip-
  </>
);

const CustomCell = ({
  children,
  actionText,
  actionType,
  actionHref,
  actionBody,
  onAction,
  ...rest
}) => {
  return (
    <Cell {...rest}>
      <ActionTooltip
        actionType={actionType}
        actionText={actionText}
        body={actionBody}
        onAction={onAction}
        href={actionHref}
      >
        {children}
      </ActionTooltip>
    </Cell>
  );
};

const TableExample = () => {
  const handleOnAction = () => {
    console.log('on action');
  };

  return (
    <Section col className="bg-white">
      <Table data={data}>
        <Column align="left" dataKey="id">
          <HeaderCell id="id">default</HeaderCell>
          <CustomCell
            actionHref="https://google.com"
            actionText="Read more >"
            actionBody={<ActionTooltipBody />}
          />
        </Column>
        <Column dataKey="lastName" width={60}>
          <HeaderCell id="lastname">multiline</HeaderCell>
          <CustomCell
            actionText="Button"
            actionBody={<ActionTooltipBody />}
            onAction={handleOnAction}
            actionType="button"
          />
        </Column>
      </Table>
    </Section>
  );
};
export default TableExample;