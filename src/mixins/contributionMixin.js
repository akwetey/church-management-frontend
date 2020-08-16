import Member from "@services/api/people";
const contribution = {
  data() {
    return {
      contributions: [
        {
          amount: 0,
          comment: "",
          date: "",
          person: "",
          method: 1,
        },
      ],
      members: [],
      methods: [
        { name: "Cash", id: 1 },
        { name: "Cheque", id: 2 },
        { name: "Online", id: 3 },
        { name: "Mobile Money", id: 4 },
      ],
    };
  },

  methods: {
    //fetch members
    async getMembers() {
      try {
        const response = await Member.members();
        const res = response.data;
        this.members = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    addMoreRecords() {
      this.contributions.push({
        amount: 0,
        comment: "",
        date: "",
        person: "",
        method: 1,
      });
    },
    RemoveRecord() {
      this.contributions.pop();
    },
  },

  async created() {
    await this.getMembers();
  },
};

export default contribution;
