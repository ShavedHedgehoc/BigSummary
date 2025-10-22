import { Injectable } from "@nestjs/common";

import { InjectConnection } from "@nestjs/sequelize";

import sequelize, { Sequelize } from "sequelize";
import * as xmljs from "xml-js";
import { UploadBoilDto } from "./dto/upload-boil-dto";

interface Resp {
  result: number;
}
@Injectable()
export class TestdbSqlService {
  constructor(@InjectConnection("trace_test_db_connection") private readonly sequelize: Sequelize) {}

  async getBatchs() {
    interface CountResp {
      count: number;
    }

    interface Resp {
      result: number;
    }
    // const query = `
    //     SELECT *
    //     FROM Batchs
    //     `;
    const countQry = `
        SELECT COUNT(*) as count
        FROM Batchs
    `;
    const countResp: CountResp[] = await this.sequelize.query(countQry, {
      replacements: {
        // batchName: dto.filter.batchName,
        // startDate: dto.filter.startDate,
        // endDate: dto.filter.endDate,
        // productId: dto.filter.productId,
        // compare: dto.filter.compare ? "true" : "false",
        // plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    return { total: countResp[0].count };
  }

  async execInsertXML(dto: UploadBoilDto) {
    // const jsDto = {
    //   document: {
    //     batch_record: {
    //       _attributes: {
    //         apparatus: 3,
    //         batch: "728J5",
    //         date: "2025-31-15 00:00:00",
    //         fin_productid: "8829",
    //         marking: "EL6/75",
    //         plan: 25000,
    //         plant: "П",
    //       },
    //       row: [
    //         { productid: "52586", productname: "Аэросил 200 (Силика Т30) Диоксид кремния HL-300", quantity: 10 },
    //         { productid: "52586", productname: "Аэросил 200 (Силика Т30) Диоксид кремния HL-300", quantity: 10 },
    //         { productid: "52586", productname: "Аэросил 200 (Силика Т30) Диоксид кремния HL-300", quantity: 1220 },
    //         { productid: "52586", productname: "Аэросил 200 (Силика Т30) Диоксид кремния HL-300", quantity: 10 },
    //       ],
    //     },
    //   },
    // };

    // const resDto = {
    //   document: {
    //     batch_record: {
    //       _attributes: {
    //         apparatus: "204",
    //         batch: "814J5",
    //         date: "10/16/25",
    //         fin_productid: "31792",
    //         marking: "ПАВ 2",
    //         plan: "10000",
    //         plant: "П",
    //       },
    //       row: [
    //         {
    //           productid: "916",
    //           productname: "Микрокар (Microcare IT, Неомид 125, Актицид МВ, Биоцид Катон LXE, Biorex IT)",
    //           quantity: "3",
    //         },
    //         {
    //           productid: "335",
    //           productname:
    //             "Сульфоэтоксилаты натрия (Emal 270 D, Texapon N70 Tainolin AES-70-2-NC,Sles 270D,СульфороканолЛ270/1)",
    //           quantity: "3600",
    //         },
    //         { productid: "11761", productname: "Вода", quantity: "6397" },
    //       ],
    //     },
    //   },
    // };
    const options = { compact: true };

    const xml = xmljs.js2xml(dto, options);
    // console.log(xml);
    // const plainXML = `<document><batch_record apparatus="701" batch="721J5" date="2025-10-14 00:00:00" fin_productid="55367" marking="AY/P1" plan="657.0" plant="К">
    // <row><productid>52586</productid>
    // <productname>Аэросил 200 (Силика Т30) Диоксид кремния HL-300</productname><quantity> 10.00000</quantity></row><row><productid>26945</productid><productname>Карбонат магния</productname><quantity> 13.30000</quantity></row><row><productid>24428</productid><productname>Лаурил сульфат натрия пудра (эмал 10P HD x, Эмал 10П ХД, Empicol, Гинопол 24П)</productname><quantity> 13.30000</quantity></row><row><productid>24954</productid><productname>Бенецел К200М / Benecel K200M, Hydroxypropyl Methyl Cellulose (HPMC)</productname><quantity> 10.00000</quantity></row><row><productid>2301</productid><productname>Диоксид титана (Хомбитан АФДЦ)</productname><quantity>  6.66900</quantity></row><row><productid>107</productid><productname>Трилон Б (VERSENE POWEDER Хелат NA4EDTA, DISSOLVINE, ETDA, ЭДТА)</productname><quantity>  6.67000</quantity></row><row><productid>1869</productid><productname>Гуар N-Hance 3205 (CG13, COSMEDIA, GUAR C 261N, Загуститель Эсафлор EC3, Esaflor)</productname><quantity>  4.67000</quantity></row><row><productid>398</productid><productname>Ксантановая камедь (Rheocare)</productname><quantity>  4.67000</quantity></row><row><productid>41710</productid><productname>Силикат натрия (Britesil C207, Portil A)</productname><quantity> 120.00000</quantity></row><row><productid>2039</productid><productname>Минеральное масло (вазелиновое масло Blandol или Меркур, DIVYOL WOP 80, Савонол 20, Савонол 15)</productname><quantity> 21.30000</quantity></row><row><productid>4117</productid><productname>Изододекан (NacoSol 1620H, Доусин ИП60)</productname><quantity>  3.33000</quantity></row><row><productid>29977</productid><productname>Полиизобутен (Rewopal PIB 1000, PIB 950, PB 950)</productname><quantity>  1.67000</quantity></row><row><productid>24868</productid><productname>Эфирное масло перечной мяты</productname><quantity>  0.00667</quantity></row><row><productid>24430</productid><productname>Краситель ультрамарин фиолетовый 12,11</productname><quantity>  0.40000</quantity></row><row><productid>22499</productid><productname>Персульфат калия (Potassium Persulfate)</productname><quantity> 332.10000</quantity></row><row><productid>22498</productid><productname>Персульфат аммония (Ammonium Persulfate)</productname><quantity> 80.00000</quantity></row><row><productid>210</productid><productname>Метасиликат натрия (безводный)</productname><quantity> 33.30000</quantity></row></batch_record></document>`;
    // const plainXML2 = `<document><batch_record apparatus="3" batch="728J5" date="2025-31-15 00:00:00" fin_productid="8829" marking="EL6/75" plan="25000.0" plant="П"><row><productid>55456</productid><productname>Основа орг. для PRINCE , кг</productname><quantity> 389.60000</quantity></row><row><productid>70937</productid><productname>Отдушка Tropical evasion SOM 000923</productname><quantity>  6.49000</quantity></row><row><productid>765</productid><productname>Флонак EP-10 (IRIODIN 100, TAIZHU 1005 silver white, N-800S, AG100ND8WA)</productname><quantity> 19.48100</quantity></row><row><productid>3076</productid><productname>Гидросульфит натрия (Натрия дитионит)</productname><quantity>  1.30000</quantity></row><row><productid>5388</productid><productname>Сульфит натрия (ТЕХ)</productname><quantity>  5.84000</quantity></row><row><productid>107</productid><productname>Трилон Б (VERSENE POWEDER Хелат NA4EDTA, DISSOLVINE, ETDA, ЭДТА)</productname><quantity>  1.30000</quantity></row><row><productid>108</productid><productname>Изоаскорбат натрия (Sodium Erythorbate)</productname><quantity>  7.15000</quantity></row><row><productid>1869</productid><productname>Гуар N-Hance 3205 (CG13, COSMEDIA, GUAR C 261N, Загуститель Эсафлор EC3, Esaflor)</productname><quantity>  4.68000</quantity></row><row><productid>29220</productid><productname>Кислота ортофосфорная (ЧДА)</productname><quantity>  0.47000</quantity></row><row><productid>50</productid><productname>Краситель ПФДА (Rodol D type J, Chemibroxc РРD, CAS 106-50-3)</productname><quantity>  5.19500</quantity></row><row><productid>51</productid><productname>Краситель резорцин (Rodol RS, Chemibroxc RS, Резорцинол)</productname><quantity>  1.94800</quantity></row><row><productid>1631</productid><productname>Краситель 2A3PYR (Chemibrox 2A3НPYR, 2A3HP) (CAS 16867-03-1)</productname><quantity>  1.55900</quantity></row><row><productid>45</productid><productname>Краситель м-аминофенол (EG) (Chemibrox MAP)(CI 76545) (CAS 591-27-5)</productname><quantity>  1.94800</quantity></row><row><productid>753</productid><productname>Аммиак водный</productname><quantity> 76.40000</quantity></row><row><productid>1897</productid><productname>ПЭГ-400</productname><quantity> 19.50000</quantity></row><row><productid>2359</productid><productname>Этоксидигликоль (Carbitol CG, Моноэтиловый эфир)</productname><quantity> 57.10000</quantity></row><row><productid>451</productid><productname>Цетримониум хлорид (Dehyguart, MICROCARE, ТОРКВАТ, СТС 25, СТС 50, Arguad 16-29)</productname><quantity> 32.50000</quantity></row><row><productid>15029</productid><productname>Масло семян камелии</productname><quantity>  0.13000</quantity></row><row><productid>2655</productid><productname>Глицерин (PALMERA G995V)</productname><quantity> 19.50000</quantity></row><row><productid>4113</productid><productname>Экстракт шелка COS (Силкерин ХЛ, протеин шелка)</productname><quantity>  0.13000</quantity></row></batch_record></document>`;
    const qry = `EXEC dbo.InsertBoilsXml2 @documentXml=:xml, @result=0; `;

    const [results, metadata] = await this.sequelize.query(qry, {
      replacements: {
        xml: xml,
        result: 0,
        type: sequelize.QueryTypes.SELECT,
      },
    });
    const normalized = Object.entries(results[0]).map(([key, value]) => ({ value }));

    // const data = [
    //   {
    //     date: "16.10.25",
    //     fin_productid: "29206",
    //     marking: "пудра HC",
    //     batch: "811J5",
    //     apparatus: "702",
    //     plan: 750,
    //     productid: "4117",
    //     productname: "Изододекан (NacoSol 1620H, Доусин ИП60)",
    //     quantity: 3.81,
    //     plant: "К",
    //   },
    //   {
    //     date: "16.10.25",
    //     fin_productid: "29206",
    //     marking: "пудра HC",
    //     batch: "811J5",
    //     apparatus: "702",
    //     plan: 750,
    //     productid: "22449",
    //     productname: "Персульфат калия (Potassium Persulfate)",
    //     quantity: 10,
    //     plant: "К",
    //   },
    //   {
    //     date: "16.10.25",
    //     fin_productid: "29206",
    //     marking: "пудра HC",
    //     batch: "811J5",
    //     apparatus: "702",
    //     plan: 750,
    //     productid: "22498",
    //     productname: "Персульфат аммония (Ammonium Persulfate)",
    //     quantity: 20,
    //     plant: "К",
    //   },
    //   {
    //     date: "16.10.25",
    //     fin_productid: "29206",
    //     marking: "пудра HC",
    //     batch: "812J5",
    //     apparatus: "702",
    //     plan: 750,
    //     productid: "4117",
    //     productname: "Изододекан (NacoSol 1620H, Доусин ИП60)",
    //     quantity: 3.81,
    //     plant: "К",
    //   },
    //   {
    //     date: "16.10.25",
    //     fin_productid: "29206",
    //     marking: "пудра HC",
    //     batch: "812J5",
    //     apparatus: "702",
    //     plan: 750,
    //     productid: "22449",
    //     productname: "Персульфат калия (Potassium Persulfate)",
    //     quantity: 10,
    //     plant: "К",
    //   },
    //   {
    //     date: "16.10.25",
    //     fin_productid: "29206",
    //     marking: "пудра HC",
    //     batch: "812J5",
    //     apparatus: "702",
    //     plan: 750,
    //     productid: "22498",
    //     productname: "Персульфат аммония (Ammonium Persulfate)",
    //     quantity: 20,
    //     plant: "К",
    //   },
    // ];

    // let res = [];
    // const groupedByCategory = data.map((item) => {
    //   const _row = { productid: item.productid, productname: item.productname, quantity: item.quantity };
    //   if (res.some((resItem) => resItem["document"]["batch_record"]["_attributes"]["batch"] === item.batch)) {
    //     const existsItem = res.filter(
    //       (resItem) => resItem["document"]["batch_record"]["_attributes"]["batch"] === item.batch
    //     )[0];

    //     const _attr = existsItem["document"]["batch_record"]["_attributes"];
    //     const rows = existsItem["document"]["batch_record"]["row"];
    //     const updatedItem = {
    //       document: { batch_record: { _attributes: { ..._attr }, row: [...rows, _row] } },
    //     };
    //     res = [
    //       ...res.filter((item) => item["document"]["batch_record"]["_attributes"]["batch"] !== item.batch_name),
    //       updatedItem,
    //     ];
    //   } else {
    //     const attr = {
    //       apparatus: item.apparatus,
    //       batch: item.batch,
    //       date: item.date,
    //       fin_productid: item.fin_productid,
    //       marking: item.marking,
    //       plan: item.plan,
    //       plant: "П",
    //     };
    //     const _doc = { document: { batch_record: { _attributes: { ...attr }, row: [{ ..._row }] } } };
    //     res = [...res, { ..._doc }];
    //   }
    // }, {});

    return normalized[0];
  }
}
