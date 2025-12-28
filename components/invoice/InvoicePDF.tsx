/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

// --- CONSTANTS ---
const BRAND_COLOR = '#2563EB'; // Blue (Primary)
const TEXT_MAIN = '#1F2937';
const TEXT_MUTED = '#6B7280';

// --- STYLES ---
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 9,
        padding: 40,
        color: TEXT_MAIN,
        lineHeight: 1.4,
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        height: 60,
    },
    invoiceTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 28,
        fontWeight: 800,
        color: '#E5E7EB',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },

    // Gray Bar Info
    infoBar: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    infoCol: { flex: 1 },
    infoLabel: {
        fontSize: 8,
        color: TEXT_MUTED,
        marginBottom: 3,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold',
    },
    infoValue: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: TEXT_MAIN,
    },

    // Total Due Section
    middleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    totalDueLabel: {
        fontSize: 9,
        color: TEXT_MUTED,
        textTransform: 'uppercase',
        marginBottom: 5,
        fontFamily: 'Helvetica-Bold',
    },
    totalDueAmount: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 24,
        fontWeight: 800,
        color: TEXT_MAIN,
    },
    addressBlock: { textAlign: 'right' },
    addressText: {
        fontSize: 9,
        color: TEXT_MUTED,
        marginBottom: 2,
    },

    // Table
    table: { width: '100%', marginBottom: 20 },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: BRAND_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    th: {
        color: '#FFFFFF',
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    // Table Columns
    colItem: { flex: 3 },
    colPrice: { flex: 1, textAlign: 'right' },
    colQty: { flex: 1, textAlign: 'center' },
    colTotal: { flex: 1, textAlign: 'right' },

    // Footer Totals
    footerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    paymentInfo: { flex: 1, paddingRight: 40 },
    paymentTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 5,
    },
    totalsSection: { width: 200 },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    grandTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: BRAND_COLOR,
        padding: 10,
        marginTop: 10,
        borderRadius: 2,
    },
    grandTotalText: {
        color: '#FFFFFF',
        fontFamily: 'Helvetica-Bold',
        fontSize: 11,
    },

    // Page Bottom
    pageBottom: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // Logo Style
    logoImage: {
        width: 140,
        height: 'auto', // Auto height preserves aspect ratio
    }
});

interface InvoiceProps {
    order: any;
    userEmail: string | null | undefined;
}

export const InvoicePDF = ({ order, userEmail }: InvoiceProps) => {
    const subtotal = order.items.reduce((acc: number, item: any) => acc + Number(item.price), 0);
    const tax = Number(order.total) - subtotal;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* 1. Header with PNG Logo */}
                <View style={styles.header}>
                    {/* Make sure logo-main.png is in your public/ folder */}
                    {/* If using window.location.origin is problematic in dev, allow hardcoded or relative path */}
                    <Image
                        style={styles.logoImage}
                        src="/logo-main.png"
                    />
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                </View>

                {/* 2. Gray Info Bar */}
                <View style={styles.infoBar}>
                    <View style={styles.infoCol}>
                        <Text style={styles.infoLabel}>Invoice No.</Text>
                        <Text style={styles.infoValue}>#{order.id.slice(-8).toUpperCase()}</Text>
                    </View>
                    <View style={styles.infoCol}>
                        <Text style={styles.infoLabel}>Date</Text>
                        <Text style={styles.infoValue}>{format(new Date(order.createdAt), "MMM dd, yyyy")}</Text>
                    </View>
                    <View style={styles.infoCol}>
                        <Text style={styles.infoLabel}>Invoice To</Text>
                        <Text style={styles.infoValue}>{userEmail || "Valued Customer"}</Text>
                    </View>
                </View>

                {/* 3. Total Due & Address */}
                <View style={styles.middleSection}>
                    <View>
                        <Text style={styles.totalDueLabel}>Total Due</Text>
                        <Text style={styles.totalDueAmount}>US ${Number(order.total).toFixed(2)}</Text>
                    </View>
                    <View style={styles.addressBlock}>
                        <Text style={[styles.addressText, { fontWeight: 'bold', color: TEXT_MAIN, fontFamily: 'Helvetica-Bold' }]}>Themes Jet Agency</Text>
                        <Text style={styles.addressText}>123 Digital Valley, Suite 404</Text>
                        <Text style={styles.addressText}>San Francisco, CA 94107</Text>
                        <Text style={styles.addressText}>support@themesjet.com</Text>
                    </View>
                </View>

                {/* 4. Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.th, styles.colItem]}>ITEM DESCRIPTION</Text>
                        <Text style={[styles.th, styles.colPrice]}>UNIT PRICE</Text>
                        <Text style={[styles.th, styles.colQty]}>QTY</Text>
                        <Text style={[styles.th, styles.colTotal]}>TOTAL</Text>
                    </View>

                    {order.items.map((item: any, index: number) => (
                        <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }]}>
                            <View style={styles.colItem}>
                                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>{item.product.name}</Text>
                                <Text style={{ fontSize: 8, color: TEXT_MUTED }}>{item.product.category || "Digital Asset"}</Text>
                            </View>
                            <Text style={[styles.colPrice, { fontSize: 10 }]}>${Number(item.price).toFixed(2)}</Text>
                            <Text style={[styles.colQty, { fontSize: 10 }]}>1</Text>
                            <Text style={[styles.colTotal, { fontSize: 10, fontFamily: 'Helvetica-Bold' }]}>${Number(item.price).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* 5. Footer Section */}
                <View style={styles.footerSection}>
                    <View style={styles.paymentInfo}>
                        <Text style={styles.paymentTitle}>Payment Method</Text>
                        <Text style={{ fontSize: 9, color: TEXT_MUTED }}>Paid via Stripe Secure Checkout.</Text>
                        <Text style={{ fontSize: 9, color: TEXT_MUTED, marginTop: 4 }}>Transaction ID: {order.stripeId || "N/A"}</Text>

                        <Text style={[styles.paymentTitle, { marginTop: 15 }]}>Terms & Conditions</Text>
                        <Text style={{ fontSize: 9, color: TEXT_MUTED }}>
                            This is a digital receipt for your purchase.
                            If you have any questions, please contact support.
                        </Text>
                    </View>

                    <View style={styles.totalsSection}>
                        <View style={styles.totalRow}>
                            <Text style={{ fontSize: 10, color: TEXT_MUTED }}>Sub Total</Text>
                            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={{ fontSize: 10, color: TEXT_MUTED }}>Tax (5%)</Text>
                            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>${tax.toFixed(2)}</Text>
                        </View>
                        <View style={styles.grandTotalRow}>
                            <Text style={styles.grandTotalText}>GRAND TOTAL</Text>
                            <Text style={styles.grandTotalText}>US ${Number(order.total).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* 6. Absolute Page Footer */}
                <View style={styles.pageBottom}>
                    <Text style={{ fontSize: 8, color: TEXT_MUTED }}>Thank you for choosing Themes Jet!</Text>
                    <Text style={{ fontSize: 8, color: BRAND_COLOR, fontFamily: 'Helvetica-Bold' }}>THEMES JET</Text>
                </View>

            </Page>
        </Document>
    );
};