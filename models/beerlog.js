module.exports = (sequelize, DataTypes) => {
  const BeerLog = sequelize.define('BeerLog', {
    data_untapped_bid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_brewery: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_brew: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_abv: {
      type: DataTypes.FLOAT(3, 1),
      allowNull: false
    },
    data_ibu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 120
      }
    },
    personal_rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT
    },
    visual_color: {
      type: DataTypes.STRING
    },
    visual_clarity: {
      type: DataTypes.STRING
    },
    visual_foam_head: {
      type: DataTypes.STRING
    },
    visual_texture: {
      type: DataTypes.STRING
    },
    visual_carbonation: {
      type: DataTypes.STRING
    },
    aroma_hops: {
      type: DataTypes.STRING
    },
    aroma_malt: {
      type: DataTypes.STRING
    },
    aroma_esters: {
      type: DataTypes.STRING
    },
    aroma_phenol: {
      type: DataTypes.STRING
    },
    flavor_alcohol: {
      type: DataTypes.STRING
    },
    flavor_hops: {
      type: DataTypes.STRING
    },
    flavor_bitterness: {
      type: DataTypes.STRING
    },
    flavor_malt: {
      type: DataTypes.STRING
    },
    palate_astringency: {
      type: DataTypes.STRING
    },
    palate_body: {
      type: DataTypes.STRING
    },
    palate_carbonation: {
      type: DataTypes.STRING
    },
    palate_finish: {
      type: DataTypes.STRING
    },
    other_oxidative: {
      type: DataTypes.STRING
    },
    other_balance: {
      type: DataTypes.STRING
    },
    other_style: {
      type: DataTypes.STRING
    }
  })

  BeerLog.associate = models => {
    BeerLog.belongsTo(models.User, {
      foreignKey: { allowNull: false }
    })
  }

  return BeerLog
}
