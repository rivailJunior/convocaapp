import{n as e}from"./chunk-vNrZSFDR.js";import{n as t}from"./iframe-fN_PPooY.js";import{n,t as r}from"./group-card-BSbqOjXn.js";var i,a,o,s,c,l,u,d,f;e((()=>{i=t(),n(),a={id:`1`,name:`Fute de Quinta`,sport:`futebol`,adminId:`admin-1`,memberIds:Array.from({length:12},(e,t)=>`user-${t}`),memberCount:12,billingMode:`fixed`,dueDay:10,paymentMethods:[`pix`],inviteCode:`INV001`,plan:`free`,createdAt:`2026-01-01T00:00:00.000Z`,nextEvent:`Qui 16/01 • 19h`,paymentStatus:`paid`},o={id:`2`,name:`Vôlei de Domingo`,sport:`volei`,adminId:`admin-1`,memberIds:Array.from({length:16},(e,t)=>`user-${t}`),memberCount:16,billingMode:`fixed`,dueDay:15,paymentMethods:[`pix`,`credit_card`],inviteCode:`INV002`,plan:`free`,createdAt:`2026-01-01T00:00:00.000Z`,nextEvent:`Dom 19/01 • 10h`,paymentStatus:`pending`},s={id:`4`,name:`Outros Esportes`,sport:`outro`,adminId:`admin-1`,memberIds:Array.from({length:5},(e,t)=>`user-${t}`),memberCount:5,billingMode:`fixed`,dueDay:10,paymentMethods:[`pix`],inviteCode:`INV004`,plan:`free`,createdAt:`2026-01-01T00:00:00.000Z`},c={title:`Components/Group/GroupCard`,component:r,parameters:{layout:`centered`},render:e=>(0,i.jsx)(`div`,{className:`w-[380px] bg-background-light p-4`,children:(0,i.jsx)(r,{...e})})},l={args:{group:a}},u={args:{group:o}},d={args:{group:s}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    group: paidGroup
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    group: pendingGroup
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    group: noEventGroup
  }
}`,...d.parameters?.docs?.source}}},f=[`Paid`,`Pending`,`NoEvent`]}))();export{d as NoEvent,l as Paid,u as Pending,f as __namedExportsOrder,c as default};