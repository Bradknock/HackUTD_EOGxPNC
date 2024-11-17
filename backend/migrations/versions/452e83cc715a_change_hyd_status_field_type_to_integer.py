"""Change hyd_status field type to Integer

Revision ID: 452e83cc715a
Revises: 998c1bfed664
Create Date: 2024-11-17 01:06:13.687658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '452e83cc715a'
down_revision = '998c1bfed664'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rawdata', schema=None) as batch_op:
        batch_op.alter_column('time_until_hyd',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=255),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rawdata', schema=None) as batch_op:
        batch_op.alter_column('time_until_hyd',
               existing_type=sa.String(length=255),
               type_=sa.INTEGER(),
               existing_nullable=True)

    # ### end Alembic commands ###