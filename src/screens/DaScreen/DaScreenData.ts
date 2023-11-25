<Transaction2Col
    key={item.id}
    initial ={''+item.createdBy?.tag}
    reference = { item.daNumber? 'DA'+item.daNumber : item.reference }
    actID = {item.project?.projectNumber}
    name={item.name}
    date={formatDate (item.createdAt)}
    status={item.status?.status}
    price={'MX'+ (item.amountTTC / Math.pow(10,6)).toFixed(2)}
    isUp={item.status.id > 4 ?  true  : false }
    backgroundIcon={item.createdBy?.group?.color?.tag}
    onPress={navigateToDaDetail(item)}
/>