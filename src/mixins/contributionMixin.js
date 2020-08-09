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
        },
      ],
      amount: "",
      comment: "",
      date: "",
      member: [],
      members: [],
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
