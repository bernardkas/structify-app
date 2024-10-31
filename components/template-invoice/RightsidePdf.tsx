'use client';
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { useFormattedDate } from '@/lib/use-formatted-date';
import { Invoice } from '@prisma/client';
import { InvoiceWithDetails } from '@/types/InvoiceType';
import parse from 'html-react-parser';

interface RightSidePDFProps {
  data: InvoiceWithDetails;
}

const RightsidePdf = ({ data }: RightSidePDFProps) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      padding: 20,
    },
    headerSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginTop: 20,
      fontSize: 11,
    },
    companyInfo: {
      fontSize: 11,
      width: '60%',
    },
    invoiceInfo: {
      width: '40%',
      textAlign: 'right',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'column',
      fontSize: 11,
    },
    headerWrapper: {},
    logo: {
      border: '1px solid #000',
      borderRadius: '10%',
      width: '100pt',
      marginBottom: 10,
    },
    billTo: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    table: {
      marginTop: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      borderBottomWidth: 1,
      padding: 5,
      fontSize: 11,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      padding: 5,
    },
    tableCell: {
      width: '25%',
      textAlign: 'right',
      fontSize: 11,
    },
    descriptionCell: {
      width: '40%',
      textAlign: 'left',
      fontSize: 11,
    },
    totalSection: {
      marginTop: 20,
      alignSelf: 'flex-end',
      fontSize: 12,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    totalTitle: {
      fontWeight: 'bold',
    },
    balanceDue: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: 'bold',
      color: 'red',
    },
    footer: {
      marginTop: 50,
      fontSize: 10,
      textAlign: 'center',
    },
    richText: {
      fontSize: 11,
    },
  });

  const {
    name,
    invoiceNumber,
    companyName,
    address,
    city,
    postCode,
    companyPhone,
    email,
    date,
    richText,
    clientName,
    clientCompanyName,
    clientAddress,
    descriptions,
    subtotal,
    taxRate,
    totalTax,
    fullPrice,
    companyLogo,
  } = data;
  // @ts-ignore
  const plainText = richText?.replace(/<\/?[^>]+(>|$)/g, '');

  console.log('data', data);

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text>INVOICE</Text>
        <View style={styles.headerSection}>
          {/* Company Info */}
          <View style={styles.companyInfo}>
            <Text>{name}</Text>
            <Text>{companyName}</Text>
            <Text>{address}</Text>
            <Text>
              {city}, {postCode}
            </Text>
            <Text>{companyPhone}</Text>
            <Text>{email}</Text>
          </View>
          {/* Invoice Info */}
          <View style={styles.invoiceInfo}>
            <View style={styles.headerWrapper} fixed>
              <View style={styles.headerWrapper} fixed>
                <Image src={companyLogo ?? ''} style={styles.logo} />
              </View>
              <Text>{useFormattedDate(date)}</Text>
              <Text>Invoice No: {invoiceNumber}</Text>
            </View>
          </View>
        </View>

        {/* Client Info */}
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{clientName}</Text>
            <Text>{clientCompanyName}</Text>
            <Text>{clientAddress}</Text>
          </View>
          <View>
            <Text style={styles.billTo}>Site / Location:</Text>
            <Text>{clientAddress}</Text>
          </View>
        </View>

        {typeof richText === 'string' && richText.trim() ? (
          <View style={styles.richText}>
            <Text>{plainText}</Text>
          </View>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.descriptionCell}>Description</Text>
              <Text style={styles.tableCell}>Qty</Text>
              <Text style={styles.tableCell}>Unit Price</Text>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            {descriptions.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.descriptionCell}>{item.description}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item.unitPrice} €</Text>
                <Text style={styles.tableCell}>{item.totalPrice} €</Text>
              </View>
            ))}
          </View>
        )}

        {/* Total Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>{subtotal} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax Rate</Text>
            <Text>{taxRate} %</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Total Tax</Text>
            <Text>{totalTax} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalTitle}>Total</Text>
            <Text style={styles.totalTitle}>{fullPrice} €</Text>
          </View>
          <Text style={styles.balanceDue}>Balance Due: {fullPrice} €</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RightsidePdf;
