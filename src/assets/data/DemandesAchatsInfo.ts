import colors from '../../theme/colors'

// query information by daNumber , daID , or reference 
// this info  is to have details for one DA 

// 
const DachatsInfo = 
    {
      id: 1,
      reference : 'XXX889909',
      name: 'Prestation Upgrade soft PS',
      createdAt: '01 Sep 2021 02:00 PM',
      notifiedAt: '30 Sep 2021 02:00 PM',
      issuedAt : '20 Sep 2021 ',  // date the DA changed status to financialApproval will be recorded  here , 
      purchasedAt : '01 Oct 2021',  // date by which we assign bcNumber to the DA is recored in this field 
      motive :'lorum ipsum sjja akjakjskjsa asslaskaslkaslas asjssklsak lsksas jhsh jshshsjh sajhsshj jhshsahjahss ' ,
      status: 'Interne', // status attrubute info for the DA ,  text to be displayed 
      amountHT : 'KXOF  600,999.0',
      amountTTC : 'KXOF 650,999.0',
      prestationType : 'Fourniture & Service', // 
      isUp: false, // status color choice , green or red
      backgroundIcon: colors.blue,
      daNumber: '888899',
      providedBy: 'Huawei Technologies' , 
      createdBy : 'Jean paul ',
      createdByInitial : 'JP', // tag of createdBy user , les initials du createur 
      createdByEmail : '@jeanpaul', // email du createur 
      createdByService : 'Sicov',  // groupName of the creator 
      createdByAvatar : '', // image of owner 
      projectID : 'IPU2490', // 
      modifiedBy : 'Mr sssks', // last ModifiedBy ( user name )
      bcNumber : '5565652',  // this can null or bcNumber info , 
    }
export  default DachatsInfo